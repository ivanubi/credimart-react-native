Credimart (React Native App)
============================
> This is Credimart's React Native application repo. It is used to register new loan applications to an already existing backend system. 

### Folder Structure

    .   
    ├── assets                   # Contains all the assets (images, fonts...) used by the application
    ├── components               # Common components used by the application.
    │   ├── ImageInput.tsx          # Component that allows the user to take a photo and load it to the application.
    │   ├── MultipleImageInput.tsx  # Same as ImageInput.tsx but allows multiple photos to be taken.
    │   └── index.ts                # Allows for easier imports.
    ├── screens                  # Source files (alternatively `lib` or `app`)
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
    ├── utils                    # ... to be soon documented.
    ├── App.tsx                  # ... to be soon documented.
    ├── AppNavigator.tsx         # ... to be soon documented.
    ├── app.json                 # ... to be soon documented.
    ├── babel.config.js          # ... to be soon documented.
    ├── mapping.json             # ... to be soon documented.
    ├── package.json             # ... to be soon documented.
    ├── package-lock.json        # ... to be soon documented.
    ├── settings.tsx             # ... to be soon documented.
    ├── tsconfig.json            # ... to be soon documented.
    ├── yarn.lock                # ... to be soon documented.
    └── README.md                # ... to be soon documented.
