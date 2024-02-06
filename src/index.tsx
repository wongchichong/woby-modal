/* ===============================
 * Rodal v2.0.0 https://github.com/chenjiahan/vodal
 * =============================== */

import { $, $$, CSSProperties, ObservableMaybe, useEffect, useMemo, type JSX } from 'woby'

import '../dist/output.css'
export * from './DialogTitle'

const IN_BROWSER = typeof window !== 'undefined'
const UA = IN_BROWSER && window.navigator.userAgent.toLowerCase()
const IS_IE_9 = UA && UA.indexOf('msie 9.0') > 0

const Dialog = (props: WodalProps & { animationType?: ObservableMaybe<string> }) => {
    const {
        showCloseButton,
        onClose,
        duration,
        customStyles,
        id,
        animationType,
        children,
        className = 'w-[50%] h-[25%]',
    } = props

    const animation = useMemo(() =>
        ($$(animationType) === 'enter'
            ? $$(props.enterAnimation)
            : $$(props.leaveAnimation)) || $$(props.animation))


    const CloseButton = showCloseButton ? (
        <span
            className="absolute cursor-pointer w-4 h-4 right-4 top-4 before:rotate-45 after:-rotate-45
            
            before:absolute before:content-[''] before:h-0.5 before:w-full before:bg-[#999] before:transition-[background] before:duration-[0.2s] before:-mt-px before:rounded-[100%] before:left-0 before:top-2/4 
            after:absolute after:content-[''] after:h-0.5 after:w-full after:bg-[#999] after:transition-[background] after:duration-[0.2s] after:-mt-px after:rounded-[100%] after:left-0 after:top-2/4 
            hover:before:bg-[#333] hover:after:bg-[#333]
            "
            onClick={e => onClose?.(e, 'committed')}
            onKeyPress={event => {
                if (onClose && event.which === 13) {
                    onClose(event, 'committed')
                }
            }}
            tabIndex={0}
        />
    ) : null

    const style = useMemo(() => ({
        animationDuration: $$(duration) + 'ms',
        ...customStyles,
    }))

    return <div style={style} className={[`absolute z-[101] bg-[#fff] shadow-[0_1px_3px_rgba(0,0,0,0.2)] m-auto p-[15px] rounded-[3px] inset-0 focus:outline-none`, () => `vodal-${$$(animation)}-${$$(animationType)}`, props.class ?? className]} id={id}>
        {children}
        {CloseButton}
    </div>
}

type WodalProps = {
    visible?: ObservableMaybe<boolean>
    showMask?: ObservableMaybe<boolean>
    closeOnEsc?: ObservableMaybe<boolean>
    closeMaskOnClick?: ObservableMaybe<boolean>
    showCloseButton?: ObservableMaybe<boolean>
    animation?: ObservableMaybe<string>
    enterAnimation?: ObservableMaybe<string>
    leaveAnimation?: ObservableMaybe<string>
    duration?: ObservableMaybe<number>
    customStyles?: ObservableMaybe<CSSProperties>
    customMaskStyles?: ObservableMaybe<CSSProperties>
    onClose?: (event, reason: 'backdropClick' | 'escapeKeyDown' | 'committed') => void
    onAnimationEnd?: () => void
    id?: string,
} & JSX.HTMLAttributes<HTMLDivElement>

export const Wodal = (props: WodalProps): JSX.Element => {
    const newProps = {
        ...{
            visible: false, showMask: true, closeOnEsc: false, closeMaskOnClick: true, showCloseButton: true, animation: 'zoom',
            enterAnimation: '', leaveAnimation: '', duration: 300, customStyles: {}, customMaskStyles: {},
        } as WodalProps
        , ...props
    }

    const {
        visible, showMask, closeOnEsc, closeMaskOnClick,
        duration, customMaskStyles,
        onClose, onAnimationEnd,
        showCloseButton,
    } = newProps

    const isShow = $(false)
    const animationType = $('leave')
    const elRef = $<HTMLDivElement>(null)

    const enter = () => {
        isShow(true)
        animationType('enter')
    }

    const leave = () => {
        isShow(false)
        animationType(IS_IE_9 ? 'leave' : 'leave')
    }

    useEffect(() => {
        if ($$(visible)) {
            enter()
        } else if (!$$(visible) && $$(isShow)) {
            leave()
        }
    })

    const onKeyUp = event => {
        if ($$(closeOnEsc) && event.keyCode === 27) {
            onClose?.(event, 'escapeKeyDown')
        }
    }

    const animationEnd = event => {
        if ($$(animationType) === 'leave') {
            isShow(false)
        } else if ($$(closeOnEsc)) {
            $$(elRef)?.focus()
        }

        if (event.target === $$(elRef) && onAnimationEnd) {
            onAnimationEnd()
        }
    }

    const Mask = $$(showMask) ? (
        <div
            className="w-full h-full z-[100] absolute bg-[rgba(0,0,0,0.3)] left-0 top-0"
            style={customMaskStyles}
            onClick={(e) => $$(closeMaskOnClick) ? onClose?.(e, 'backdropClick') : {}}
        />
    ) : null

    const style = useMemo(() => ({
        animationDuration: $$(duration) + 'ms',
    }))

    return <div
        style={style}
        className={['w-full h-full z-[100] left-0 top-0 fixed', () => `vodal-fade-${$$(animationType)}`, () => $$(isShow) ? '' : 'hidden',]}
        onAnimationEnd={animationEnd}
        tabIndex={-1}
        ref={elRef}
        onKeyUp={onKeyUp}
    >
        {Mask}
        <Dialog
            {...{
                animationType,
                ...newProps
            }}
        />
    </div>
}
