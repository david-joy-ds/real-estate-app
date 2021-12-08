## Sorting example Stargate Document API

This app provides an example of how the document API can be used to do searches across various parameters in Astra.

The app also, provides a client side example of how the sorting can then be done on the Astra Side.

A key thing to note is that if need an order of objects then we need to use an Array instead of JSON. You may have to modify your data structure if its only JSON objects.

Example : 

Step 1 : Change JSON TO ARRAY

```
var json = [{
    "price": 300000,
    "bedrooms": 3
}, {
    "price": 200000,
    "bedrooms": 1
}, {
    "price": "450000",
    "bedrooms": 2
}]
```

Step 2 : Sort Array on property on client side

```
json.sort(function(a, b){
    return a.price - b.price;
});
```

note: if you want to reverse the order just do `b.price-a.price`

--------------------------------
## Sample data used for Real Estate App

```
{
    "property_id":10,
    "hometype": "house",
    "bedroom": 3,
    "bathroom": 1,
    "lotsize": 35,
    "area": 1960,
    "price": 295000,
    "year_built": 1998,
    "no_of_stories": 1,
    "address": "1728 Drekist, Durango, CO",
    "status": "sell"
}
```

### Sorting Logic 

Go to `home.js` and check out the sorting code and logic in the sorting function.

```
if (filter==="price") 
    {const newJson = json.sort(function(a, b){
      return b.price - a.price 
    })
      setpropertydetail(newJson)
    }else if (filter==="bedroom") 
    {const newJson = json.sort(function(a, b){
        return b.bedroom - a.bedroom 
    })
    setpropertydetail(newJson)
    } else if (filter==="bathroom"){
      const newJson = json.sort(function(a, b){
      return b.bathroom - a.bathroom 
    })
    setpropertydetail(newJson)
   }
  }
```  

### Filtering Logic

is handled based on the selection criteria's used in the app - code available in `getPropertyData.js`

```
const filter = event.queryStringParameters.filter;
const value = event.queryStringParameters.selection;
const quertbuild =  '{' + '"'+filter+'"' + ': { "$gt" :'+value+'}}'
const query = JSON.parse(quertbuild)

const result = await propertyCollection.find(query);
```
