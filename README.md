# Fretboard Music - React Native (Expo) Guitar Shop

Files:
- App.js        the whole app
- guitars.json  the guitar data (local copy, also the file you host as your API)

## Run it (computer + phone)

1. Install Node.js (nodejs.org) and the Expo Go app on your phone.
2. Open a terminal and run:

   npx create-expo-app GuitarShop --template blank
   cd GuitarShop
   npx expo install expo-font @expo-google-fonts/poppins

3. Copy App.js and guitars.json from this folder into the GuitarShop
   project, replacing the existing App.js.
4. Start the app:

   npx expo start

5. Scan the QR code with Expo Go (phone and computer on the same Wi-Fi).
   If it will not connect, run: npx expo start --tunnel

## Run it with no install (Snack)

1. Go to https://snack.expo.dev/
2. Paste App.js into the App.js tab.
3. Click "+" > New file, name it guitars.json, and paste the data.
4. Accept the prompt to add @expo-google-fonts/poppins.

## Make it a real API call

1. Create a public GitHub repo (example: guitar-api) and upload guitars.json.
2. Open guitars.json on GitHub, click "Raw", copy the URL.
3. Paste it into API_URL at the top of App.js.
4. Reload the app. The header changes to "Live data from API".

## References (add to your submission)
- React Native docs: https://reactnative.dev/docs/getting-started
- FlatList: https://reactnative.dev/docs/flatlist
- Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- Expo Snack: https://snack.expo.dev/

# guitarshop-api
