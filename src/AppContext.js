import React from "react";

// const appContextWrapper = (component) => ({
//   ...initialAppState,

//   setUserID: (userID) => {
//     initialAppState.userID = userID;
//     component.setState({ context: appContextWrapper(component) });
//   },
// });

// const appContext = React.createContext({
// 	userID: null,
// 	setUserID: (userID) =>
// })

// export class AppContextProvider {
//   state = {
//     context: appContextWrapper(this),
//   };

//   render() {
//     return (
//       <AppContext.Provider value={this.state.context}>
//         {this.props.children}
//       </AppContext.Provider>
//     );
//   }
// }
