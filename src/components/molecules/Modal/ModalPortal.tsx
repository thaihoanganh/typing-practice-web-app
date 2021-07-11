import React, { useMemo } from "react";
import { createPortal } from "react-dom";

export const ModalPortal: React.FC = ({ children }) => {
  const el = useMemo(() => document.createElement("div"), []);
  const body = document.getElementsByTagName("body")[0];

  React.useEffect(() => {
    el.classList.add("fixed");
    el.classList.add("inset-0");
    el.classList.add("z-20");
    document.body.appendChild(el);

    if (body.scrollHeight > window.innerHeight) {
      body.style.overflow = "hidden";
      body.style.paddingRight = "17px";
    }

    return () => {
      document.body.removeChild(el);

      if (body.scrollHeight > window.innerHeight) {
        body.style.overflow = "auto";
        body.style.paddingRight = "0px";
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [el]);

  return createPortal(children, el);
};
