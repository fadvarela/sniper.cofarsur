import { NavEntity } from '../general/nav-entity.interface';

export const getNavMenuList = (): Array<NavEntity> => {
  const navMenuList = [
    {
      id: 1,
      header: 'Sniper',
      link: '#',
      disabled: false,
      tooltip: '',
      dropdown: true,
      submenu: [
        {
          id: 2,
          header: 'Configuraciones',
          link: '#',
          disabled: false,
          tooltip: ''
        },
        {
          id: 3,
          header: 'Soporte',
          link: '#',
          disabled: false,
          tooltip: '',
          dropdown: true,
          submenu: [
            {
              id: 4,
              header: 'ABM Sistema',
              link: '#',
              disabled: false,
              tooltip: ''
            },
            {
              id: 5,
              header: 'ABM Estructuras',
              link: '#',
              disabled: false,
              tooltip: ''
            },
            {
              id: 6,
              header: 'ABM Novedades',
              link: '#',
              disabled: false,
              tooltip: ''
            }
          ]
        }
      ]
    },
    {
      id: 7,
      header: 'Nómina',
      link: '#',
      disabled: false,
      tooltip: '',
      dropdown: true,
      submenu: [
        {
          id: 8,
          header: 'ABM Personas',
          link: '#',
          disabled: false,
          tooltip: ''
        }
      ]
    },
    {
      id: 9,
      header: 'Novedades',
      link: '#',
      disabled: false,
      tooltip: '',
      dropdown: true,
      submenu: [
        {
          id: 10,
          header: 'Jornadas Habituales',
          link: '/jornadas-habituales',
          disabled: false,
          tooltip: ''
        },
        {
          id: 11,
          header: 'Justificaciones',
          link: '/justificaciones',
          disabled: false,
          tooltip: ''
        },
        {
          id: 12,
          header: 'Parte diario',
          link: '/parte-diario',
          disabled: false,
          tooltip: ''
        }
      ]
    },
    {
      id: 13,
      header: 'Reportes',
      link: '',
      disabled: false,
      tooltip: '#',
      dropdown: true,
      submenu: [
        {
          id: 14,
          header: 'Novedades Consolidadas',
          link: '#',
          disabled: false,
          tooltip: ''
        },
        {
          id: 15,
          header: 'Anomalías',
          link: '#',
          disabled: false,
          tooltip: ''
        }
      ]
    },
  ];
  return navMenuList;
};
