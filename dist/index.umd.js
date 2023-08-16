(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("voby/jsx-runtime"), require("voby")) : typeof define === "function" && define.amd ? define(["exports", "voby/jsx-runtime", "voby"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global["voby-modal"] = {}, global["voby/jsx-runtime"], global.voby));
})(this, function(exports2, jsxRuntime, voby) {
  "use strict";
  const output = "";
  const IN_BROWSER = typeof window !== "undefined";
  const UA = IN_BROWSER && window.navigator.userAgent.toLowerCase();
  const IS_IE_9 = UA && UA.indexOf("msie 9.0") > 0;
  const Dialog = (props) => {
    const {
      showCloseButton,
      onClose,
      duration,
      customStyles,
      id,
      animationType,
      children,
      className = "w-[50%] h-[25%]"
    } = props;
    const animation = voby.useMemo(() => (voby.$$(animationType) === "enter" ? voby.$$(props.enterAnimation) : voby.$$(props.leaveAnimation)) || voby.$$(props.animation));
    const CloseButton = showCloseButton ? /* @__PURE__ */ jsxRuntime.jsx(
      "span",
      {
        className: "absolute cursor-pointer w-4 h-4 right-4 top-4 before:rotate-45 after:-rotate-45\r\n            \r\n            before:absolute before:content-[''] before:h-0.5 before:w-full before:bg-[#999] before:transition-[background] before:duration-[0.2s] before:-mt-px before:rounded-[100%] before:left-0 before:top-2/4 \r\n            after:absolute after:content-[''] after:h-0.5 after:w-full after:bg-[#999] after:transition-[background] after:duration-[0.2s] after:-mt-px after:rounded-[100%] after:left-0 after:top-2/4 \r\n            hover:before:bg-[#333] hover:after:bg-[#333]\r\n            ",
        onClick: onClose,
        onKeyPress: (event) => {
          if (onClose && event.which === 13) {
            onClose(event);
          }
        },
        tabIndex: 0
      }
    ) : null;
    const style = voby.useMemo(() => ({
      animationDuration: voby.$$(duration) + "ms",
      ...customStyles
    }));
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { style, className: [`absolute z-[101] bg-[#fff] shadow-[0_1px_3px_rgba(0,0,0,0.2)] m-auto p-[15px] rounded-[3px] inset-0 focus:outline-none`, () => `vodal-${voby.$$(animation)}-${voby.$$(animationType)}`, className], id, children: [
      children,
      CloseButton
    ] });
  };
  const Vodal = (props) => {
    const newProps = {
      ...{
        visible: false,
        showMask: true,
        closeOnEsc: false,
        closeMaskOnClick: true,
        showCloseButton: true,
        animation: "zoom",
        enterAnimation: "",
        leaveAnimation: "",
        duration: 300,
        customStyles: {},
        customMaskStyles: {}
      },
      ...props
    };
    const {
      visible,
      showMask,
      closeOnEsc,
      closeMaskOnClick,
      duration,
      customMaskStyles,
      onClose,
      onAnimationEnd
    } = newProps;
    const isShow = voby.$(false);
    const animationType = voby.$("leave");
    const elRef = voby.$(null);
    const enter = () => {
      isShow(true);
      animationType("enter");
    };
    const leave = () => {
      isShow(false);
      animationType(IS_IE_9 ? "leave" : "leave");
    };
    voby.useEffect(() => {
      if (voby.$$(visible)) {
        enter();
      } else if (!voby.$$(visible) && voby.$$(isShow)) {
        leave();
      }
    });
    const onKeyUp = (event) => {
      if (voby.$$(closeOnEsc) && event.keyCode === 27) {
        onClose == null ? void 0 : onClose(event);
      }
    };
    const animationEnd = (event) => {
      var _a;
      if (voby.$$(animationType) === "leave") {
        isShow(false);
      } else if (voby.$$(closeOnEsc)) {
        (_a = voby.$$(elRef)) == null ? void 0 : _a.focus();
      }
      if (event.target === voby.$$(elRef) && onAnimationEnd) {
        onAnimationEnd();
      }
    };
    const Mask = voby.$$(showMask) ? /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        className: "w-full h-full z-[100] absolute bg-[rgba(0,0,0,0.3)] left-0 top-0",
        style: customMaskStyles,
        onClick: (e) => voby.$$(closeMaskOnClick) ? onClose == null ? void 0 : onClose(e) : {}
      }
    ) : null;
    const style = voby.useMemo(() => ({
      animationDuration: voby.$$(duration) + "ms"
    }));
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        style,
        className: ["w-full h-full z-[100] left-0 top-0 fixed", () => `vodal-fade-${animationType}`, () => voby.$$(isShow) ? "" : "hidden"],
        onAnimationEnd: animationEnd,
        tabIndex: -1,
        ref: elRef,
        onKeyUp,
        children: [
          Mask,
          /* @__PURE__ */ jsxRuntime.jsx(
            Dialog,
            {
              ...{
                animationType,
                ...newProps
              }
            }
          )
        ]
      }
    );
  };
  exports2.Vodal = Vodal;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
//# sourceMappingURL=index.umd.js.map
