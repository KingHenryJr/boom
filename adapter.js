class BombAdapter {

    static getBombs(){
    return fetch("http://localhost:3000/").then(res => res.json())
    }

    static createBombs(data){
        return fetch("http://localhost:3000/api/v1/users", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(resp => resp.json())
    }

    static editBombs(JSONdata){
        return fetch(`http://localhost:3000/tasks/${JSONdata.id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(JSONdata)
    }).then(resp => resp.json())
    }

    static deleteBombs(task){
        return fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: 'DELETE'
    })
    }
}
