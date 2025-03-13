
module.exports = {
  packagerConfig: {
    asar: true,
    icon: './public/assets/restopos-logo',
    name: 'resto-pos',
    executableName: 'resto-pos',
    appBundleId: 'com.restopos.app',
    appCategoryType: 'public.app-category.business',
    win32metadata: {
      CompanyName: 'resto-pos',
      FileDescription: 'Restaurant POS System',
      ProductName: 'Resto POS',
      InternalName: 'RestoPos'
    }
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'resto-pos',
        authors: 'Resto POS',
        description: 'Restaurant POS System',
        setupIcon: './public/assets/restopos-logo.png',
        loadingGif: './public/assets/installer-loading.gif',
        noMsi: false,
        setupExe: 'resto-pos-setup.exe'
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin']
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          maintainer: 'Resto POS',
          homepage: 'https://restopos.example.com',
          icon: './public/assets/restopos-logo.png'
        }
      }
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        options: {
          maintainer: 'Resto POS',
          homepage: 'https://restopos.example.com',
          icon: './public/assets/restopos-logo.png'
        }
      }
    }
  ]
};
