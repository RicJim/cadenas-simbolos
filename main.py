from flask import Flask, render_template, request, url_for, jsonify, redirect
import os

app = Flask(__name__)

@app.route('/')
def index():    
    return render_template('index.html')

@app.route('/calculate_results', methods=['POST'])
def calculate_results():
    exponenteA = int(request.form['exponentea'])
    exponenteB = int(request.form['exponenteb'])
    cadenaA = request.form['cadena1']
    cadenaB = request.form['cadena2']
    operacion = int(request.form['radio-option'])
    
    resultado_concatenacion = cadenaA + cadenaB if operacion == 1 else cadenaB + cadenaA
    resultado_cadena_a = cadenaA * exponenteA
    resultado_cadena_b = cadenaB * exponenteB
    
    resultados = {
        'cadena1': cadenaA,
        'cadena2': cadenaB,
        'concatenacion': resultado_concatenacion,
        'cadena_a': resultado_cadena_a,
        'cadena_b': resultado_cadena_b
    }
    
    return jsonify(resultados=resultados, redirect=url_for('resultado', **resultados))

@app.route('/resultado', methods=['GET'])
def resultado():
    return render_template('resultados.html', **request.args)

if __name__ == '__main__':
    app.run(debug=True, port=os.getenv("PORT", default=5000))
