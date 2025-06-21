// mapboxgl.accessToken=maptoken;
// const map = new mapboxgl.Map({
//         container: 'map', // container ID
//         style:"mapbox://styles/mapbox/strrets-v12",
//         center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
//         zoom: 9 // starting zoom
// });
// console.log("Listing Coordinates:", listing.geometry.coordinates);

// const marker=new mapboxgl.Marker({color:"pink"})
// .setLngLat(listing.geometry.coordinates)
// .setPopup(
//         new mapboxgl.Popup({offset:25}).setHTML(
//                 `<h4>${listing.location}</h4>
//                 <h3>Welcome to the services provided by the SheStayByTaiyaba!!</h3>`
//         )
// )
// .addTo(map);
document.addEventListener("DOMContentLoaded", () => {
        mapboxgl.accessToken = maptoken;
    
        if (
            listing &&
            listing.geometry &&
            Array.isArray(listing.geometry.coordinates) &&
            listing.geometry.coordinates.length === 2
        ) {
            const map = new mapboxgl.Map({
                container: 'map',
                style: "mapbox://styles/mapbox/streets-v12",
                center: listing.geometry.coordinates,
                zoom: 9
            });
    
            new mapboxgl.Marker({ color: "pink" })
                .setLngLat(listing.geometry.coordinates)
                .setPopup(
                    new mapboxgl.Popup({ offset: 25 }).setHTML(
                        `<h4>${listing.location}</h4>
                        <p>Welcome to the services provided by SweetStayByTaiyaba!!</p>`
                    )
                )
                .addTo(map);
        } else {
            console.error("Invalid or missing coordinates:", listing.geometry);
        }
    });
    

