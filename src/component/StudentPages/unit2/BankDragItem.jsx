import React, { useRef } from "react";
import { createPortal } from "react-dom";
export default function BankDragItem({
  provided,
  snapshot,
  freeze,
  normalStyle,
  children,
}) {
  const appearance = useRef({});
  const originalRef = children.props.ref;
  const measure = (node) => {
    if (!node || snapshot.isDragging) return;
    const computed = window.getComputedStyle(node);
    const rect = node.getBoundingClientRect();
    // offsetWidth rounds to whole pixels, which can enlarge the portalled text
    // just enough to wrap inside the library's exact (fractional) width.
    const cssWidth = parseFloat(computed.width);
    const borderBoxWidth =
      computed.boxSizing === "border-box"
        ? cssWidth
        : cssWidth +
          [
            "paddingLeft",
            "paddingRight",
            "borderLeftWidth",
            "borderRightWidth",
          ].reduce((sum, key) => sum + (parseFloat(computed[key]) || 0), 0);
    const layoutWidth =
      Number.isFinite(borderBoxWidth) && borderBoxWidth > 0
        ? borderBoxWidth
        : node.offsetWidth;
    const scale = layoutWidth ? rect.width / layoutWidth : 1;
    const next = {
      fontFamily: computed.fontFamily,
      fontWeight: computed.fontWeight,
      color: computed.color,
    };
    for (const key of [
      "fontSize",
      "lineHeight",
      "letterSpacing",
      "paddingTop",
      "paddingRight",
      "paddingBottom",
      "paddingLeft",
      "borderTopWidth",
      "borderRightWidth",
      "borderBottomWidth",
      "borderLeftWidth",
      "borderRadius",
    ]) {
      const value = parseFloat(computed[key]);
      if (Number.isFinite(value)) next[key] = value * scale;
    }
    appearance.current = next;
  };
  const ref = (node) => {
    if (typeof originalRef === "function") originalRef(node);
    else if (originalRef) originalRef.current = node;
    measure(node);
  };
  const element = React.cloneElement(children, {
    ref,
    onPointerDownCapture: (event) => {
      children.props.onPointerDownCapture?.(event);
      measure(event.currentTarget);
    },
    style: {
      position: "relative",
      ...normalStyle,
      ...(snapshot.isDragging ? appearance.current : {}),
      ...provided.draggableProps.style,
      ...(snapshot.isDragging
        ? {
            // The bank makes this span a flex item; retain its single-line text
            // alignment when the actual draggable is moved into the portal.
            display: "flex",
            alignItems: "center",
            whiteSpace: "nowrap",
            opacity: 1,
            visibility: "visible",
            zIndex: 2147483647,
            pointerEvents: "none",
          }
        : freeze
          ? { transform: "none", transition: "none" }
          : {}),
    },
  });
  if (!snapshot.isDragging) return element;
  const space = React.createElement(
    children.type,
    {
      "aria-hidden": true,
      className: children.props.className,
      style: {
        position: "relative",
        ...normalStyle,
        visibility: "visible",
        pointerEvents: "none",
      },
    },
    children.props.children,
  );
  return (
    <>
      {space}
      {createPortal(element, document.fullscreenElement || document.body)}
    </>
  );
}
