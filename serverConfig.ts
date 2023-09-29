const receptServer = (selectServer: String = "") => {
  if (selectServer == "production") {
    return "https://react-flutter-android-native.onrender.com";
  } else {
    return "http://localhost:8080";
  }
};

export default receptServer;
