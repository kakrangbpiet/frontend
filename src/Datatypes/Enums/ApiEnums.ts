const base_url_backend="https://backend-everything-37ada44e5086.herokuapp.com/v1"


export const ApiEndpoint: Record<string, any> = {
  // TRAVEL API ENDPOINTS
GET_TRAVEL_ITEMS: { 
    apiId: 20, 
    withAuth: false, 
    url: `${base_url_backend}/Travel/travelType`, 
    method: 'GET', 
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Loading travel items",
    successMessage: "",
    errorMessage: "Error loading travel items"
  },
  GET_TRAVEL_ITEMS_BY_CATEGORY: { 
    apiId: 21, 
    withAuth: false, 
    url: `${base_url_backend}/Travel/travelCategory`, 
    method: 'GET', 
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Loading travel items by category",
    successMessage: "",
    errorMessage: "Error loading travel items by category"
  },
  GET_SINGLE_TRAVEL_ITEM: { 
    apiId: 22, 
    withAuth: false, 
    url: `${base_url_backend}/Travel`, 
    method: 'GET', 
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Loading travel item details",
    successMessage: "",
    errorMessage: "Error loading travel item"
  },
  ADD_TRAVEL_ITEM: { 
    apiId: 23, 
    withAuth: true, 
    url: `${base_url_backend}/Travel`, 
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Adding new travel item",
    successMessage: "Travel item added successfully",
    errorMessage: "Error adding travel item"
  },
  UPDATE_TRAVEL_ITEM_STATUS: { 
    apiId: 24, 
    withAuth: true, 
    url: `${base_url_backend}/Travel/updateStatus`, 
    method: 'PATCH', 
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Updating travel item status",
    successMessage: "Travel item status updated successfully",
    errorMessage: "Error updating travel item status"
  },
  EDIT_TRAVEL_ITEM: { 
    apiId: 25, 
    withAuth: true, 
    url: `${base_url_backend}/Travel`, 
    method: 'PATCH', 
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Editing travel item",
    successMessage: "Travel item updated successfully",
    errorMessage: "Error updating travel item"
  },
}