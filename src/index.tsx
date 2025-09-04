/* ===============================
 * Rodal v2.0.0 https://github.com/chenjiahan/vodal
 * =============================== */

import { $, $$, ObservableMaybe, useEffect, useMemo, type JSX } from "woby"

export * from "./DialogTitle"

const IN_BROWSER = typeof window !== "undefined"
const UA = IN_BROWSER && window.navigator.userAgent.toLowerCase()
const IS_IE_9 = UA && UA.indexOf("msie 9.0") > 0

const ModalDialog = (props: WodalProps & { animationType?: ObservableMaybe<string> }) => {
	const { draggable, showCloseButton, onClose, duration, id, animationType, children, className = "h-[25%]", widthPercentage, class: cls } = props

	const animation = useMemo(() => ($$(animationType) === "enter" ? $$(props.enterAnimation) : $$(props.leaveAnimation)) || $$(props.animation))

	const CloseButton = showCloseButton ? (
		<button
			className={"absolute cursor-pointer w-4 h-4 right-8 top-4 [&.svg]:hover:bg-red"}
			onClick={(e) => onClose?.(e, "committed")}
			onKeyPress={(event) => {
				if (onClose && event.which === 13) {
					onClose(event, "committed")
				}
			}}
			tabIndex={0}
		>
			<svg
				className="w-4 h-4"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</button>
	) : null

	const dragging = $(false)
	const ref = $<HTMLElement>()
	const relativeCursorPos = $<{ x: number; y: number }>(null)
	const animationFrame = $<number>()
	const style = useMemo(() => ({
		animationDuration: $$(duration) + "ms",
	}))

	useEffect(() => {
		if (!draggable) {
			return
		}

		if ($$(dragging)) {
			document.addEventListener("mousemove", onMouseMove)
			document.addEventListener("mouseup", onMouseUp)
		}
		else {
			document.removeEventListener("mousemove", onMouseMove)
			document.removeEventListener("mouseup", onMouseUp)
		}
	})

	const onMouseDown = (e) => {
		// only left mouse button
		if (e.button !== 0) return
		const relativePos = {
			x: e.clientX,
			y: e.clientY,
		}

		dragging(true)
		relativeCursorPos(relativePos)
	}

	const onMouseUp = (e) => {
		dragging(false)
	}

	const onMouseMove = (e) => {
		if (!$$(dragging)) return
		const pos = {
			x: e.clientX - $$(relativeCursorPos).x,
			y: e.clientY - $$(relativeCursorPos).y,
		}

		cancelAnimationFrame($$(animationFrame));
		animationFrame(requestAnimationFrame(() => {
			$$(ref).style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
		}))

		e.stopPropagation()
		e.preventDefault()
	}

	return (
		<div
			style={style}
			className={[
				`fixed z-[101] h-[60%] bg-[#fff] shadow-[0_1px_3px_rgba(0,0,0,0.2)] m-auto p-[15px] rounded-[3px] inset-0 focus:outline-none`,
				() => `vodal-${$$(animation)}-${$$(animationType)}`, className, cls,
				widthPercentage ?? "w-[50%]"
			]}
			id={id}
			ref={ref}
			onMouseDown={onMouseDown}
		>
			{children}
			{CloseButton}
		</div>
	)
}

export type WodalProps = {
	draggable?: boolean
	visible?: ObservableMaybe<boolean>
	showMask?: ObservableMaybe<boolean>
	closeOnEsc?: ObservableMaybe<boolean>
	closeMaskOnClick?: ObservableMaybe<boolean>
	showCloseButton?: ObservableMaybe<boolean>
	animation?: ObservableMaybe<string>
	enterAnimation?: ObservableMaybe<string>
	leaveAnimation?: ObservableMaybe<string>
	duration?: ObservableMaybe<number>
	widthPercentage?: ObservableMaybe<string>
	onClose?: (event, reason: "backdropClick" | "escapeKeyDown" | "committed") => void
	onAnimationEnd?: () => void
	id?: string
} & JSX.HTMLAttributes<HTMLDivElement>

export const Wodal = (props: WodalProps): JSX.Element => {
	const newProps = {
		...({
			draggable: true,
			visible: false,
			showMask: true,
			closeOnEsc: false,
			closeMaskOnClick: true,
			showCloseButton: true,
			animation: "zoom",
			enterAnimation: "",
			leaveAnimation: "",
			duration: 300,
			widthPercentage: props.widthPercentage,
		} as WodalProps),
		...props,
	}

	const { visible, showMask, closeMaskOnClick, onClose } = newProps

	const isShow = $(false)
	const animationType = $("leave")

	const enter = () => {
		isShow(true)
		animationType("enter")
	}

	const leave = () => {
		isShow(false)
		animationType(IS_IE_9 ? "leave" : "leave")
	}

	useEffect(() => {
		if ($$(visible)) {
			enter()
		} else if (!$$(visible) && $$(isShow)) {
			leave()
		}
	})

	const Mask = $$(showMask) ? (
		<div
			className="w-screen h-screen z-[100] absolute bg-[rgba(0,0,0,0.3)] left-0 top-0"
			onClick={(e) => ($$(closeMaskOnClick) ? onClose?.(e, "backdropClick") : {})}
		/>
	) : null

	return () => ($$(isShow) ?
		<div
			className={["w-fit h-fit z-[100] left-0 top-0 fixed ", () => ($$(isShow) ? "" : "hidden")]}
		>
			{Mask}
			<ModalDialog
				{...{
					animationType,
					...newProps,
				}}
			/>
		</div> : null
	)
}
