export type TabName = 'Inicio' | 'Cuentas' | 'Analisis' | 'Metas' | 'Pagos';

export interface TabItem {
  name: TabName;
  icon: string;
  isActive?: boolean;
}

export interface BottomTabBarProps {
  activeTab: TabName;
  onTabPress: (tabName: TabName) => void;
  hasFAB?: boolean;
}