from flask import Flask, render_template,  request, jsonify
from flask_cors import CORS
import subprocess
import openai

app = Flask(__name__)


CORS(app, resources={r"/process_text": {"origins": "http://localhost:3000"}})

openai.api_key = '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'


@app.route('/')
def index():

    local_file_path = 'local.txt'

    result = subprocess.run(['bandit', local_file_path], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    bandit_report = result.stdout

    chat_input = f"Code analysis report from Bandit:\n{bandit_report}\nCode file contents:\n{open(local_file_path).read() } Give suggestions on how to improve on security here after reading the report"

    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=chat_input,
        max_tokens=150,  
        n = 1 
    )
    chatgpt_feedback = response.choices[0].text
    print(chatgpt_feedback)
    # Render the Bandit report
    return render_template('report.html', bandit_report=bandit_report, chatgpt_feedback=chatgpt_feedback)


@app.route('/process_text', methods=['POST'])
def process_text():
    try:

        data = request.get_json()
        text = data.get('text')
        

        with open('local.txt', 'w') as file:
            file.write(text)

        local_file_path = 'local.txt'

        result = subprocess.run(['bandit', local_file_path], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        bandit_report = result.stdout

        chat_input = f"Code analysis report from Bandit:\n{bandit_report}\nCode file contents:\n{ open(local_file_path).read() } Give suggestions on how to improve on security here after reading the report in a descriptive way first  "

        response = openai.Completion.create(
            engine="text-davinci-002",
            prompt=chat_input,
            max_tokens=150,  
            n = 1 
        )
        chatgpt_feedback = response.choices[0].text
        print(response)
        return jsonify({'bandit_report': bandit_report, 'chatgpt_feedback': chatgpt_feedback})
    except Exception as e:
        print(e);
        return str(e), 400  

if __name__ == '__main__':
    app.run(debug=True)
