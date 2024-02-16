export interface MenuItem {
    id: number;
    name: string;
    path: string;
    submenu?: MenuItem[];
  }

export const menu: MenuItem[] = [
    {
        id: 1,
        name: 'Plastik Boru',
        path: '/plastikborular',
        submenu: [
            {
                id: 10,
                name: 'PVC Boru',
                path: '/pvc',
                submenu: [
                    {
                        id: 100,
                        name: 'PVC Boru 1',
                        path: '/pvc1'
                    },
                    {
                        id: 101,
                        name: 'PVC Boru 2',
                        path: '/pvc2'
                    },
                    {
                        id: 102,
                        name: 'PVC Boru 3',
                        path: '/pvc3'
                    }
                ]
            },
            {
                id: 12,
                name: 'PE Boru',
                path: '/pe'
            },
            {
                id: 13,
                name: 'PP Boru',
                path: '/pp'
            }
        ]
    },
    {
        id: 2,
        name: 'Çelik Borular',
        path: '/celikborular',
        submenu: [
            {
                id: 14,
                name: 'Dikisiz Boru',
                path: '/dikisiz'
            },
            {
                id: 15,
                name: 'Dikili Boru',
                path: '/dikili'
            },
            {
                id: 16,
                name: 'Dikisli Boru',
                path: '/dikisli'
            }
        ]
    },
    {
        id: 3,
        name: 'Vanalar',
        path: '/vanalar',
        submenu: [
            {
                id: 1,
                name: 'Küresel Vana',
                path: '/kuresel'
            },
            {
                id: 2,
                name: 'Kelebek Vana',
                path: '/kelebek'
            },
            {
                id: 3,
                name: 'Çek Vana',
                path: '/cek'
            }
        ]

    },
    {
        id: 4,
        name: 'Kelepçeler',
        path: '/kelepceler',
        submenu: [
            {
                id: 1,
                name: 'PVC Kelepçe',
                path: '/pvc'
            },
            {
                id: 2,
                name: 'Çelik Kelepçe',
                path: '/celik'
            },
            {
                id: 3,
                name: 'Galvaniz Kelepçe',
                path: '/galvaniz'
            }
        ]
    }

]