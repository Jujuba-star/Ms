function mostrarCampos() {
    const opcao = document.getElementById('opcao').value;
    const campos = [
        'campo-amplitude', 'campo-omega', 'campo-tempo', 'campo-fase',
        'campo-posicao', 'campo-frequencia', 'campo-L', 'campo-I',
        'campo-m', 'campo-h', 'campo-K'
    ];

    // Oculta todos os campos
    campos.forEach(campo => {
        document.getElementById(campo).style.display = 'none';
    });

    // Exibe campos conforme a opção selecionada
    switch (opcao) {
        case 'posicao':
        case 'velocidade':
        case 'aceleracao':
            document.getElementById('campo-amplitude').style.display = 'block';
            document.getElementById('campo-omega').style.display = 'block';
            document.getElementById('campo-tempo').style.display = 'block';
            document.getElementById('campo-fase').style.display = 'block';
            break;

        case 'amplitude':
            document.getElementById('campo-posicao').style.display = 'block';
            document.getElementById('campo-omega').style.display = 'block';
            document.getElementById('campo-tempo').style.display = 'block';
            document.getElementById('campo-fase').style.display = 'block';
            break;

        case 'frequencia':
            document.getElementById('campo-omega').style.display = 'block';
            break;

        case 'frequencia-angular':
        case 'periodo':
            document.getElementById('campo-frequencia').style.display = 'block';
            break;

        case 'pendulo-simples':
            document.getElementById('campo-L').style.display = 'block';
            break;

        case 'pendulo-fisico':
            document.getElementById('campo-I').style.display = 'block';
            document.getElementById('campo-m').style.display = 'block';
            document.getElementById('campo-h').style.display = 'block';
            break;

        case 'pendulo-torçao':
            document.getElementById('campo-I').style.display = 'block';
            document.getElementById('campo-K').style.display = 'block';
            break;
    }
}

function calcular() {
    const opcao = document.getElementById('opcao').value;
    let resultado, unidade;

    switch (opcao) {
        case 'posicao':
            const A_pos = parseFloat(document.getElementById('A').value);
            const omega_pos = parseFloat(document.getElementById('omega').value);
            const t_pos = parseFloat(document.getElementById('t').value);
            const phi_pos = parseFloat(document.getElementById('phi').value);
            resultado = A_pos * Math.cos(omega_pos * t_pos + phi_pos);
            unidade = 'metros';
            break;

        case 'velocidade':
            const A_vel = parseFloat(document.getElementById('A').value);
            const omega_vel = parseFloat(document.getElementById('omega').value);
            const t_vel = parseFloat(document.getElementById('t').value);
            const phi_vel = parseFloat(document.getElementById('phi').value);
            resultado = -A_vel * omega_vel * Math.sin(omega_vel * t_vel + phi_vel);
            unidade = 'metros/segundo';
            break;

        case 'aceleracao':
            const A_acc = parseFloat(document.getElementById('A').value);
            const omega_acc = parseFloat(document.getElementById('omega').value);
            const t_acc = parseFloat(document.getElementById('t').value);
            const phi_acc = parseFloat(document.getElementById('phi').value);
            resultado = -A_acc * Math.pow(omega_acc, 2) * Math.cos(omega_acc * t_acc + phi_acc);
            unidade = 'metros/segundo²';
            break;

        case 'amplitude':
            const x = parseFloat(document.getElementById('x').value);
            const omega_amp = parseFloat(document.getElementById('omega').value);
            const t_amp = parseFloat(document.getElementById('t').value);
            const phi_amp = parseFloat(document.getElementById('phi').value);
            resultado = x / Math.cos(omega_amp * t_amp + phi_amp);
            unidade = 'metros';
            break;

        case 'frequencia':
            const omega_freq = parseFloat(document.getElementById('omega').value);
            const f = omega_freq / (2 * Math.PI);
            const T = 2 * Math.PI / omega_freq;
            document.getElementById('resultado').innerHTML = `
                Frequência f: ${f.toFixed(2)} Hz<br>
                Período T: ${T.toFixed(2)} segundos
            `;
            return;

        case 'frequencia-angular':
            const f_ang = parseFloat(document.getElementById('f').value);
            resultado = 2 * Math.PI * f_ang;
            unidade = 'rad/s';
            break;

        case 'periodo':
            const f_per = parseFloat(document.getElementById('f').value);
            resultado = 1 / f_per;
            unidade = 'segundos';
            break;

        case 'pendulo-simples':
            const L = parseFloat(document.getElementById('L').value);
            const g = 9.81;
            resultado = 2 * Math.PI * Math.sqrt(L / g);
            unidade = 'segundos';
            break;

        case 'pendulo-fisico':
            const I = parseFloat(document.getElementById('I').value);
            const m = parseFloat(document.getElementById('m').value);
            const h = parseFloat(document.getElementById('h').value);
            resultado = 2 * Math.PI * Math.sqrt(I / (m * 9.81 * h));
            unidade = 'segundos';
            break;

        case 'pendulo-torçao':
            const I_tor = parseFloat(document.getElementById('I').value);
            const K = parseFloat(document.getElementById('K').value);
            resultado = 2 * Math.PI * Math.sqrt(I_tor / K);
            unidade = 'segundos';
            break;

        default:
            alert('Selecione uma equação válida!');
            return;
    }

    document.getElementById('resultado').innerHTML = `
        Resultado: ${resultado.toFixed(2)} ${unidade}
    `;
}