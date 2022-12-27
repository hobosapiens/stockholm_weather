export const getWeatherData = async city => {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
        )
        if (!response.ok) return null

        return await response.json()
    } catch (error) {
        console.error('Error: ', error)
    }
}

export const getPlaceData = (service, placeId, name, callback) => {
    try {
        service.getDetails({placeId: placeId, language: 'en'}, function (place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                callback({
                    id: placeId,
                    name: name,
                    photos: place.photos
                })
            } else {
                throw new Error('Error getting Place Details');
            }
        })
    } catch (error) {
        console.error('Error: ', error)
    }
}