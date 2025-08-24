import { getPrometheusAvailabilityById } from "./prometheus";
import { getLatestAvailability } from "./db";

export async function compareLatestWithCurrent(apt_code) {
    const prevData = (await getLatestAvailability(apt_code)).current_availability
    const currentData = await getPrometheusAvailabilityById(apt_code)

    const prevSet = new Set(prevData.map(item => item.unitNumber))
    const currentSet = new Set(currentData.map(item => item.unitNumber))

    const removedUnits = [...prevSet].filter(unit => !(currentSet.has(unit)))
    const addedUnits = [...currentSet].filter(unit => !(prevSet.has(unit)))

    const removedObjects = prevData.filter(unit => removedUnits.includes(unit.unitNumber))
    const addedObjects = currentData.filter(unit => addedUnits.includes(unit.unitNumber))
    console.log(JSON.stringify(removedObjects))
    console.log(addedObjects)
    const messageForRemoved = removedObjects.length > 0 ? `WOW! THERE ARE APARTMENTS GOT LEASED: ${JSON.stringify(removedObjects)}` : ''
    const messageForAdded = addedObjects.length > 0 ? `LOOK! NEW APARTMENT FOUND: ${JSON.stringify(addedObjects)}` : ''
    if (!removedObjects && !addedObjects) {
        return null
    }else{
        return messageForRemoved + "\n" + messageForAdded
    }
}