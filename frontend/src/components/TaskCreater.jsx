import React from 'react'

function TaskCreater() {
    return (
        <div>
            <form>
                <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input type="text" class="form-control" id="title" />
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <input type="text" class="form-control" id="description"/>
                </div>
                <button type="submit" class="btn btn-primary">Create</button>
            </form>
        </div>
    )
}

export default TaskCreater
