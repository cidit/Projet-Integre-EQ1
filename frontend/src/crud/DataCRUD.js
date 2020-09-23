
export async function simpleFetch(url = "", method = "GET", data = {}) {
    const response = await fetch(url, {method: method, headers: {"Content-Type": "application/json"}, body: JSON.stringify(data)})
    return response.json()
}