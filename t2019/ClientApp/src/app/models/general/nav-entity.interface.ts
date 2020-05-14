export interface NavEntity {
  id: number;
  header: string;
  link: string;
  disabled: boolean;
  tooltip: string;
  tooltipPosition?: string;
  dropdown?: boolean;
  submenu?: NavEntity[];
}
