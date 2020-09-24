import { NavEntity } from '../general/nav-entity.interface';

export const getNavMenuList = (idRol): Array<NavEntity> => {
  const navMenuList = [
    {
      id: 1,
      header: 'Sniper',
      link: '#',
      disabled: false,
      hidden: false,
      tooltip: '',
      dropdown: true,
      submenu: [
        {
          id: 2,
          header: 'Configuraciones',
          link: '#',
          disabled: false,
          hidden: false,
          tooltip: ''
        },
        {
          id: 3,
          header: 'Soporte',
          link: '#',
          disabled: false,
          hidden: false,
          tooltip: '',
          dropdown: true,
          submenu: [
            {
              id: 4,
              header: 'ABM Sistema',
              link: '#',
              disabled: false,
              hidden: false,
              tooltip: ''
            },
            {
              id: 5,
              header: 'ABM Estructuras',
              link: '#',
              disabled: false,
              hidden: false,
              tooltip: ''
            },
            {
              id: 6,
              header: 'ABM Novedades',
              link: '#',
              disabled: false,
              hidden: false,
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
      hidden: false,
      tooltip: '',
      dropdown: true,
      submenu: [
        {
          id: 8,
          header: 'ABM Personas',
          link: '#',
          disabled: false,
          hidden: false,
          tooltip: ''
        }
      ]
    },
    {
      id: 9,
      header: 'Novedades',
      link: '#',
      disabled: false,
      hidden: false,
      tooltip: '',
      dropdown: true,
      submenu: [
        {
          id: 10,
          header: 'Jornadas Habituales',
          link: '/jornadas-habituales',
          disabled: false,
          hidden: false,
          tooltip: ''
        },
        {
          id: 11,
          header: 'Avisos',
          link: '/avisos',
          disabled: false,
          hidden: false,
          tooltip: ''
        },
        {
          id: 12,
          header: 'Justificaciones',
          link: '/justificaciones',
          disabled: false,
          hidden: idRol === 2,
          tooltip: ''
        },
        {
          id: 13,
          header: 'Vacaciones',
          link: '/vacaciones',
          disabled: false,
          hidden: idRol === 2,
          tooltip: ''
        },
        {
          id: 14,
          header: 'Parte diario',
          link: '/parte-diario',
          disabled: false,
          hidden: false,
          tooltip: ''
        }
      ]
    },
    {
      id: 15,
      header: 'Reportes',
      link: '',
      disabled: false,
      hidden: false,
      tooltip: '#',
      dropdown: true,
      submenu: [
        {
          id: 16,
          header: 'Novedades Consolidadas',
          link: '#',
          disabled: false,
          hidden: false,
          tooltip: ''
        },
        {
          id: 17,
          header: 'Anomalías',
          link: '#',
          disabled: false,
          hidden: false,
          tooltip: ''
        }
      ]
    },
  ];
  return navMenuList;
};
