aed-heatmap
===========

Heatmap of aeds using HeartSpark data

Get Aeds
--------
Retrieve all of the aeds, default is xml format that Google Map API prefers.

```
	http://heartsparkapp.org/server/getaeds.php?format=json
```

Parameters:
```
[optional] ?format=json  // Returns the aed list in json.
[optional] ?resultLimit=100 // Returns specified limit
[optional] ?lat=38.89&lon=-77.02 // Returns aed near specific lat/lon combination 
    
```
