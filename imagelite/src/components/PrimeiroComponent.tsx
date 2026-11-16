'use client'

interface PrimeiroComponentProps {
  mensagem: string;
  mensagemBotao: string;
  mensagemOpcional?: string; // Propriedade opcional
}

export const PrimeiroComponent: React.FC<PrimeiroComponentProps> = (props: PrimeiroComponentProps) => {
  
  function handleClick() {
    alert('Clicou no botão Primeiro!');
  }
  
  return (
    <div>
      <h1>{props.mensagem}</h1>

      <button onClick={handleClick} style={{ border: '1px solid black', padding: '5px 20px', backgroundColor: '#3f0d1c', cursor: 'pointer' }}>
        {props.mensagemBotao}
      </button>
    </div>
  );
}

export const ArrowFunctionComponent = () => {
  function handleClick() {
    alert('Clicou no botão Arrow!');
  }

  return (
    <div>
      <h1>Arrow Function Component</h1>

      <button onClick={handleClick} style={{ border: '1px solid black', padding: '5px 20px', backgroundColor: '#3f0d1c', cursor: 'pointer' }}>
        Clique aqui
      </button>
    </div>
  );
}