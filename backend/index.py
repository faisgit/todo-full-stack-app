from flask import Flask, request, jsonify, make_response
import pymysql
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
import pymysql.cursors
from datetime import timedelta
from flask_cors import CORS
app = Flask(__name__)
bcrypt = Bcrypt(app)


DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "todo_db",
    "cursorclass": pymysql.cursors.DictCursor
}


app.config['JWT_SECRET_KEY'] = 'sdfsd324sdfsdf' 
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_ACCESS_COOKIE_NAME'] = 'access_token'
app.config['JWT_COOKIE_SECURE'] = False  
app.config['JWT_COOKIE_CSRF_PROTECT'] = False
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)  


jwt = JWTManager(app)


CORS(app, supports_credentials=True)

def get_db_connection():
    return pymysql.connect(**DB_CONFIG)


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    try:
        conn = get_db_connection()
        with conn.cursor() as cur:
            cur.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, hashed_password))
        conn.commit()
        conn.close()
        return jsonify({'message': 'User registered successfully'}), 201
    except pymysql.MySQLError as e:
        return jsonify({'message': 'Error occurred', 'error': str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    conn = get_db_connection()
    with conn.cursor() as cur:
        cur.execute("SELECT * FROM users WHERE username = %s", (username,))  # Fixed missing comma
        user = cur.fetchone()
    conn.close()

    if user and bcrypt.check_password_hash(user['password'], password):  # Fixed password check
        access_token = create_access_token(identity=str(user['id']))

        # Set token in HTTP-only cookie
        response = make_response(jsonify({'message': 'Login successful', 'username' : username, 'isAuthenticated': True }), 200)
        response.set_cookie('access_token', access_token, httponly=True, secure=False)  # secure=True for HTTPS

        return response
    else:
        return jsonify({'message': 'Invalid username or password'}), 401


@app.route('/todos', methods=['POST'])
@jwt_required(locations=['cookies'])  
def create_todo():
    user_id = get_jwt_identity()  
    if not user_id:
        return jsonify({'message': 'Unauthorized'}), 401

    data = request.get_json()
    title = data.get('title')

    if not title:
        return jsonify({'message': 'Title is required'}), 400

    conn = get_db_connection()
    with conn.cursor() as cur:
        cur.execute("INSERT INTO todos (user_id, title) VALUES (%s, %s)", (user_id, title))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Task created successfully'}), 201

@app.route('/todos', methods=['GET'])
@jwt_required(locations=['cookies'])
def get_all_todos():
    user_id = get_jwt_identity()
    if not user_id:
        return jsonify({'message': 'Unauthorized'}), 401
    conn = get_db_connection()
    with conn.cursor() as cur:
        cur.execute("SELECT * FROM  todos WHERE user_id = %s",(user_id))
        all_todos = cur.fetchall()
    conn.close()

    if all_todos:
        return jsonify({"todos": all_todos}), 200
    return jsonify({'message': 'user not found'}), 404


@app.route('/todos/<int:todo_id>', methods=['GET'])
@jwt_required(locations=['cookies'])
def get_one_todos(todo_id):
    user_id = get_jwt_identity()

    conn = get_db_connection()
    with conn.cursor() as cur:
        cur.execute("SELECT * FROM todos WHERE id = %s AND user_id = %s", (todo_id, user_id))
        todo = cur.fetchone()

        if not todo:
            return jsonify({'message': 'Task not found'}),404
    conn.close()

    if todo:
        return jsonify({"todo": todo})
    return jsonify({'message': 'user not found'}), 404
    

@app.route('/todos/<int:todo_id>', methods=['DELETE'])
@jwt_required(locations=['cookies'])
def delete_todo(todo_id):
    user_id = get_jwt_identity()
    # todo_id = int(request.args.get('id'))

    conn =get_db_connection()

    with conn.cursor() as cur:
        cur.execute("SELECT * FROM todos WHERE id = %s AND user_id = %s", (todo_id, user_id))
        todo = cur.fetchone()

        if not todo:
            return jsonify({'message': 'Task not found'}), 404
        
        cur.execute("DELETE FROM todos WHERE id = %s", (todo_id))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Task Deleted Successfully'}), 200
        

@app.route('/todos/<int:todo_id>', methods=['PUT'])
@jwt_required()
def update_todo(todo_id):
    user_id = get_jwt_identity()
    data = request.get_json()
    title = data.get('title')

    conn = get_db_connection()
    with conn.cursor() as cur:
        cur.execute("SELECT * FROM todos WHERE id = %s AND user_id = %s", (todo_id, user_id))
        todo = cur.fetchone()

        if not todo:
            return jsonify({'message': 'Task not found'}), 404

        cur.execute("UPDATE todos SET title = %s WHERE id = %s", (title, todo_id))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Task updated successfully'}), 200

@app.route('/logout', methods=['POST'])
def logout():
    response = make_response(jsonify({'isAuthenticated': False,'message': 'Logged out successfully'}), 200)
    response.set_cookie('access_token', '', expires=0)  # Clear token
    return response

if __name__ == '__main__':
    app.run(debug=True)
