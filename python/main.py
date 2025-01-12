from flask import Flask, request, jsonify
import os

app = Flask(__name__)


@app.route('/get_files')
def get_files():
    path = request.args.get('path')
    if not path:
        return jsonify({'error': 'Invalid path'}), 400

    try:
        files = os.listdir(path)
        file_info = [{'name': f, 'path': os.path.join(path, f)} for f in files]
        return jsonify({'files': file_info})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
