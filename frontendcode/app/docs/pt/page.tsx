export default function DocsPtPage() {
  return (
    <main className="min-h-screen bg-[#f3f1f7]">
      <div className="container mx-auto px-4 py-10 prose prose-slate max-w-none">
        <h1>Documentação</h1>
        <p>Visão geral do sistema, contratos e frontends.</p>

        <section>
          <h2>Índice</h2>
          <ol>
            <li><a href="#estrutura">Estrutura</a></li>
            <li><a href="#contratos">Contratos</a></li>
            <li><a href="#fluxos">Fluxos</a></li>
          </ol>
        </section>

        <section id="estrutura">
          <h2>Estrutura do Repositório</h2>
          <ul>
            <li><code>contracts/</code> — Contratos principais.</li>
            <li><code>scripts/</code> — Scripts de implantação.</li>
            <li><code>frontendcode/</code> — App unificado (Next.js).</li>
          </ul>
        </section>

        <section id="contratos">
          <h2>Contratos Inteligentes</h2>
          <ul>
            <li>StableCoin — ERC‑20 da stablecoin.</li>
            <li>Vat — Contabilidade central (colateral/dívida).</li>
            <li>Pot — Poupança (USR).</li>
          </ul>
        </section>

        <section id="fluxos">
          <h2>Fluxos</h2>
          <ul>
            <li>Abrir cofre, cunhar, quitar, desbloquear.</li>
            <li>Depositar e sacar no Pot (USR).</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
