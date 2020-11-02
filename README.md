Credimart (React Native App)
============================
> This is Credimart's React Native application repo. The app is used to register new loan applications to an already existing backend system. 

### Folder Structure

    .   
    ├── assets                   # Contains all the assets (images, fonts...) used by the application
    ├── components               # Common components used by the application.
    │   ├── ImageInput.tsx          # Component that takes a photo as an input
    │   ├── MultipleImageInput.tsx  # Same as ImageInput.tsx but allows multiple photos.
    │   └── index.ts                # Allows for easier imports.
    ├── screens                  # Screens
    │   ├── form                        # All the Screens that belongs to Form Screen.
    │   │   ├── ClientFormScreen.tsx             # Client information.
    │   │   ├── ConditionsFormScreen.tsx         # Loan conditions information.
    │   │   ├── GuaranteeFormScreen.tsx          # Guarantee information.
    │   │   ├── GuarantorFormScreen.tsx          # Guarantor information.
    │   │   ├── WorkFormScreen.tsx               # Work or enterprise related information.
    │   │   ├── index.ts                         # Allows for easier imports.
    │   │   ├── settings.ts                      # Form settings (for example: default form data settings).
    │   ├── FormScreen.tsx              # Form Screen.
    │   ├── HomeScreen.tsx              # Home Screen.
    │   ├── LoginScreen.tsx             # Login Screen.
    │   └── index.ts                    # Allows for easier imports.
    ├── utils                    # Helper functions.
    ├── App.tsx                  # Main Application file. 
    ├── AppNavigator.tsx         # Main Stack Navigator.
    ├── app.json                 # Application configuration file.
    ├── babel.config.js          # Babel configuration file.
    ├── mapping.json             # Mapping configuration file.
    ├── package.json             # Required packages.
    ├── package-lock.json        # -
    ├── settings.tsx             # Application settings (for example: backend IPs)
    ├── tsconfig.json            # Typescript configuration file.
    ├── yarn.lock                # -
    └── README.md                # The document you are reading right now.

### Configurations

Configuration variables like the backend IP address goes in the `settings.tsx` file in the main directory. `./settings.tsx`:
```tsx
export const API_URL = "http://www.sige.do:50111";
```

Or you might need to change the `app.json` file in the main directory. For example, if you want to change the Google Maps' API key used by the application you would need to change it in `app.json`. `app.json`:

```json
{
    "expo": {
        "name": "Credimart",
        "slug": "credimart",
        "platforms": ["android", "web"],
        "version": "1.0.0",
        "orientation": "portrait",
        "icon": "./assets/icon.png",
        "splash": {
            "image": "./assets/splash.png",
            "resizeMode": "contain",
            "backgroundColor": "#ffffff"
        },
        "updates": {
            "fallbackToCacheTimeout": 0
        },
        "assetBundlePatterns": ["**/*"],
        "android": {
            "package": "com.credimart.credimart",
            "versionCode": 1,
            "config": {
                "googleMaps": {
                    "apiKey": "AIzaSyCYCdgt-Cgdxjm-wRD0MX7aPDW8iRnTMTw"
                }
            }
        }
    }
}
```

### Setup / Installation

##### - Step 1: Clone the repository.
`git clone https://github.com/ivanubi/credimart-react-native.git`

##### - Step 2: Install Expo command line tools.
`npm install --global expo-cli`
Optional steps (it would make you life easier):

- Register on Expo (either using the web or using the command `expo register`).
- Then Login on Expo using `expo login`.

##### - Step 3: Install packages.
Run
`npm install`.

##### - Step 4: Start Application with Expo.
Run 
`expo start`.

##### - Step 5: Download on your phone the Expo app (https://play.google.com/store/apps/details?id=host.exp.exponent) to see changes in your application while you are developing it.

