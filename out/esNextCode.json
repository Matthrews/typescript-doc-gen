// @ts-nocheck
import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  CSSProperties,
} from "react";
import classNames from "classnames";
import ReactDOM from "react-dom";
import { default as Button } from "@/Button";
import { default as Mask } from "@/Mask";
import { getPrefixCls, getParent as getContainerDom } from "@/_util";
import { modalManager, useModalManager } from "./util/modalManager";

interface ConfirmProps {
  /**
   * 提示类型
   * @default info
   */
  type?: "info" | "success" | "confirm" | "warn" | "warning" | "error";
  /**
   * 提示标题
   * @note 我是备注
   */
  title?: string;
  content?: React.ReactNode;
}

interface FooterProps {
  /**
   * 自定义页脚
   */
  footer?: React.ReactNode;
  /**
   * 确定文案
   */
  okText?: React.ReactNode;
  /**
   * 取消文案
   */
  cancelText?: React.ReactNode;
  /**
   * 异步确认回调
   */
  confirmLoading?: boolean;
  /**
   * 确定回调
   */
  onOk?: (envent?: any) => void;
  /**
   * 取消回调
   */
  onCancel?: (envent?: any) => void;
}

interface CLoseProps {
  /**
   * 是否可以关闭
   */
  closable?: boolean;
  /**
   * 自定义关闭 icon
   */
  icon?: string; // TODO
  /**
   * 关闭回调
   */
  onClose?: () => void;
}

interface StyleProps {
  /**
   * 包裹样式
   */
  wrapperStyle?: CSSProperties;
  /**
   * header样式
   */
  headerStyle?: CSSProperties;
  /**
   * body样式
   */
  bodyStyle?: CSSProperties;
  /**
   * footer样式
   */
  footerStyle?: CSSProperties;
}

/**
 * 自定义Props
 */
interface CustomProps {
  /** xx1 */
  x1: number;
  /** xx2 */
  x2: number;
  /** xx3 */
  x3: number;
}

/**
 * 模态框Props
 */
export interface ModalProps
  extends ConfirmProps,
    FooterProps,
    CLoseProps,
    StyleProps {
  /**
   * 是否可见
   */
  visible: boolean;
  /**
   * 挂载DOM节点
   */
  getContainer?: () => HTMLElement | HTMLElement | string;
  /**
   * 前缀
   */
  prefixCls?: string;
  /**
   * className
   */
  className?: string;
  /**
   * 子结点
   */
  children?: React.ReactNode;
  /**
   * okCancel
   */
  okCancel?: boolean;
  /**
   * CustomProps
   */
  customProps?: CustomProps;
}

const Modal: any = ({
  prefixCls: customizePrefixCls,
  className,
  title,
  content,
  type,
  visible,
  confirmLoading,
  children,
  footer: customFooter,
  getContainer,
  onClose,
  onOk,
  onCancel,
  wrapperStyle,
  headerStyle,
  bodyStyle,
  footerStyle,
}: ModalProps) => {
  const [show, setShow] = useState(visible);
  const prefixCls = getPrefixCls("modal", customizePrefixCls);

  const modalRef = useRef(null);

  useModalManager(modalRef, visible);

  useEffect(() => {
    setShow(visible);
  }, [visible]);

  const handleCloseModal = () => {
    setShow(false);
    if (typeof onClose === "function") {
      onClose();
    } else {
      if (typeof onCancel === "function") {
        onCancel();
      }
    }
  };

  const handleOk = (e?: React.SyntheticEvent) => {
    onOk?.(e);
  };

  const handleCancel = (e?: React.SyntheticEvent) => {
    setShow(false);
    onCancel?.(e);
  };

  useEffect(() => {
    if (show === true && confirmLoading === false) {
      setShow(false);
    }
  }, [confirmLoading]);

  useEffect(() => {
    if (show) {
      document.body.classList.add("x-scrolling-effect");
    } else {
      document.body.classList.remove("x-scrolling-effect");
    }
  }, [show]);

  const handleKeydown = (event: KeyboardEvent) => {
    // Only the last modal need to be escaped when pressing the esc key
    if (event.key !== "Escape" || !modalManager.isTopModal(modalRef)) {
      return;
    }
    handleCancel();
  };

  useEffect(() => {
    if (show) {
      document.addEventListener("keydown", handleKeydown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [show]);

  const titleClose = useMemo(() => {
    return !type ? (
      <Button type="text" onClick={handleCloseModal}>
        <span className={classNames(`${prefixCls}-close-x`)}>×</span>
      </Button>
    ) : null;
  }, [type]);

  const footer = useMemo(() => {
    return type ? (
      <Button type="primary" onClick={handleCancel}>
        我知道了
      </Button>
    ) : (
      <>
        <Button type="default" onClick={handleCancel}>
          取消
        </Button>
        <Button type="primary" onClick={handleOk} loading={confirmLoading}>
          确定
        </Button>
      </>
    );
  }, [type]);

  const modalContent = (
    <div className={classNames(`${prefixCls}-content`)} style={wrapperStyle}>
      <div className={classNames(`${prefixCls}-header`)} style={headerStyle}>
        <div className={classNames(`${prefixCls}-title`)}>{title}</div>
        {titleClose}
      </div>
      <div className={classNames(`${prefixCls}-body`)} style={bodyStyle}>
        {type ? content : children}
      </div>
      <div className={classNames(`${prefixCls}-footer`)} style={footerStyle}>
        {customFooter ?? footer}
      </div>
    </div>
  );

  const container = getContainerDom(getContainer);
  const modal = (
    <div className={classNames(prefixCls, className)}>
      <Mask
        visible={show}
        maskClick={() => {}}
        onClose={() => {}}
        style={{ backgroundColor: "inherit" }}
      />
      <div
        role="dialog"
        ref={modalRef}
        className={classNames(`${prefixCls}-wrapper`)}
      >
        {modalContent}
      </div>
    </div>
  );
  return show ? ReactDOM.createPortal(modal, container) : null;
};

export default Modal;
