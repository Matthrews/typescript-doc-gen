// @ts-nocheck
interface IProps {
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
  /** 确定回调 */
  onOk?: (envent?: any) => void;
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
export interface ModalProps extends FooterProps {
  /**
   * 提示类型
   * @default info
   */
  type?: "info" | "success" | "confirm" | "warn" | "warning" | "error";
  /**
   * 提示标题
   * @note 我是额外备注
   */
  title?: string;
  content?: React.ReactNode;
  /** 确定回调 */
  onOk?: (envent?: any) => void;
  /**
   * 挂载DOM节点
   */
  getContainer?: () => HTMLElement | HTMLElement | string;
  /** CustomProps */
  customProps?: CustomProps;
}

export default (props: IProps) => {
  return <h2>Hello</h2>;
};
