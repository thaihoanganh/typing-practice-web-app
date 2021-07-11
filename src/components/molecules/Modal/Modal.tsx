import React, { useEffect, useRef } from "react";

import Grid from "@/components/atoms/Grid";
import { ModalPortal } from ".";

export interface ModalProps {
  isOpen?: boolean;
  onClickOutside?: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClickOutside }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      onClickOutside && onClickOutside();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return (
    <React.Fragment>
      {isOpen && (
        <ModalPortal>
          <Grid className="h-full pt-20 bg-opacity-24" color="contrast">
            <Grid className="w-640 mx-auto rounded" color="primary">
              <div ref={ref}>{children}</div>
            </Grid>
          </Grid>
        </ModalPortal>
      )}
    </React.Fragment>
  );
};

export default Modal;
