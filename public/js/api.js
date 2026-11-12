export async function apiRequest(method, path, body) {
    const options = { method, headers: {} }
    if (body !== undefined) {
        options.headers["Content-Type"] = "application/json"
        options.body = JSON.stringify(body)
    }

    let response;
    try {
        response = await fetch(`/api${path}`, options)
    } catch {
        throw new Error("Could not reach the server")
    }

    const text = await response.text()
    let data = null
    if (text) {
        try {
            data = JSON.parse(text)
        } catch {
            throw new Error("Server sent a body that isn't valid JSON")
        }
    }

    if (!response.ok) {
        throw new Error(data?.error || `Request failed (${response.status})`)
    }

    return data
}
