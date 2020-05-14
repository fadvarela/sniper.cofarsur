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
          id: 1,
          header: 'Configuraciones',
          link: '#',
          disabled: false,
          tooltip: ''
        },
        {
          id: 1,
          header: 'Soporte',
          link: '#',
          disabled: false,
          tooltip: '',
          dropdown: true,
          submenu: [
            {
              id: 1,
              header: 'ABM Sistema',
              link: '#',
              disabled: false,
              tooltip: ''
            },
            {
              id: 1,
              header: 'ABM Estructuras',
              link: '#',
              disabled: false,
              tooltip: ''
            },
            {
              id: 1,
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
      id: 1,
      header: 'Nómina',
      link: '#',
      disabled: false,
      tooltip: '',
      dropdown: true,
      submenu: [
        {
          id: 1,
          header: 'ABM Personas',
          link: '#',
          disabled: false,
          tooltip: ''
        }
      ]
    },
    {
      id: 2,
      header: 'Novedades',
      link: '#',
      disabled: false,
      tooltip: '',
      dropdown: true,
      submenu: [
        {
          id: 1,
          header: 'Jornadas Habituales',
          link: '#',
          disabled: false,
          tooltip: ''
        },
        {
          id: 2,
          header: 'Justificaciones',
          link: '#',
          disabled: false,
          tooltip: ''
        },
        {
          id: 3,
          header: 'Parte diario',
          link: '/parte-diario',
          disabled: false,
          tooltip: ''
        }
      ]
    },
    {
      id: 3,
      header: 'Reportes',
      link: '',
      disabled: false,
      tooltip: '#',
      dropdown: true,
      submenu: [
        {
          id: 1,
          header: 'Novedades Consolidadas',
          link: '#',
          disabled: false,
          tooltip: ''
        },
        {
          id: 2,
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
