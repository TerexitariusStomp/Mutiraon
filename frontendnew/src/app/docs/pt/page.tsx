export default function DocsPtPage() {
  return (
    <main className="min-h-screen bg-[#f3f1f7]">
      <div className="container mx-auto px-4 py-10 prose prose-slate max-w-none">
        <h1>Documentação da Base de Código OGUSD</h1>
        <p>
          Visão geral de contratos inteligentes, scripts de implantação, subgraph e frontends.
        </p>

        <section>
          <h2>Índice</h2>
          <ol>
            <li><a href="#structure">Estrutura do Repositório</a></li>
            <li><a href="#contracts">Contratos Inteligentes</a></li>
            <li><a href="#flows">Fluxos do Sistema</a></li>
            <li><a href="#deployment">Implantação &amp; Scripts</a></li>
            <li><a href="#subgraph">Subgraph</a></li>
            <li><a href="#frontend">Frontends</a></li>
            <li><a href="#config">Configuração</a></li>
            <li><a href="#dev">Guia do Desenvolvedor</a></li>
            <li><a href="#troubleshooting">Solução de Problemas</a></li>
            <li><a href="#glossary">Glossário</a></li>
          </ol>
        </section>

        <section id="structure">
          <h2>Estrutura do Repositório</h2>
          <p>
            Na raiz, este monorepo contém contratos em Solidity, scripts de implantação, um subgraph e dois frontends.
          </p>
          <ul>
            <li><code>contracts/</code> — Contratos do protocolo (estilo Maker: Vat, Spot, Dog, Clip, Jug, Vow, End, Pot, StableCoin, Join, PriceFeed, Calc, Multicall).</li>
            <li><code>scripts/</code> — Scripts Hardhat para implantação, configuração e fluxos E2E.</li>
            <li><code>subgraph/</code> — Subgraph do The Graph para indexar dados on-chain.</li>
            <li><code>frontendnew/</code> — App Next.js (UI atual) com RainbowKit e shadcn/ui.</li>
            <li><code>frontend/</code> — App React legado (referência).</li>
            <li><code>test/</code> — Testes Mocha/Chai para contratos.</li>
            <li><code>deployments/</code> — Endereços das implantações por rede.</li>
          </ul>
        </section>

        <section id="contracts">
          <h2>Contratos Inteligentes</h2>
          <p>
            OGUSD é um sistema de posições de dívida colateralizadas (CDP) inspirado no MakerDAO. Componentes principais:
          </p>
          <ul>
            <li><strong>StableCoin.sol</strong> — Stablecoin ERC-20 cunhada/queimada via joins e Vat.</li>
            <li><strong>Vat.sol</strong> — Contabilidade central: saldos de colateral/dívida, urns, ilks, line/dust global, move/frob.</li>
            <li><strong>Spot.sol</strong> — Configuração de risco do colateral e oráculos; define colateralização segura (<code>mat</code>).</li>
            <li><strong>Dog.sol</strong> — Guardião de liquidação; inicia leilões quando o cofre fica inseguro; integra com <em>Clip</em>.</li>
            <li><strong>Clip.sol</strong> — Leilões holandeses com decaimento de preço via <em>Calc</em>.</li>
            <li><strong>Calc.sol</strong> — Algoritmos de decaimento (exponencial, linear, stairstep).</li>
            <li><strong>Jug.sol</strong> — Taxas de estabilidade (duty por ilk) que acumulam ao longo do tempo.</li>
            <li><strong>Vow.sol</strong> — Gestão de superávit/déficit do sistema; aciona Flap/Flop em cenários completos.</li>
            <li><strong>End.sol</strong> — Encerramento global (shutdown de emergência).</li>
            <li><strong>Pot.sol</strong> — Taxa de poupança (DSR) para depósitos ociosos.</li>
            <li><strong>Adaptadores Join</strong> — Entrada/saída de ERC-20 e join/exit da stablecoin.</li>
            <li><strong>PriceFeed.sol</strong> — Integrações com oráculos para preços de referência.</li>
          </ul>
        </section>

        <section id="flows">
          <h2>Fluxos do Sistema</h2>
          <ul>
            <li><strong>Abrir Cofre</strong> — Usuário trava colateral via Join no Vat e cunha OGUSD.</li>
            <li><strong>Quitar &amp; Retirar</strong> — Queima OGUSD para reduzir dívida e liberar colateral quando seguro.</li>
            <li><strong>Liquidação</strong> — Dog aciona leilão no Clip quando o cofre está inseguro; lances cobrem a dívida.</li>
            <li><strong>Taxas de Estabilidade</strong> — Acumulam via Jug; receita gerida pelo Vow.</li>
          </ul>
        </section>

        <section id="deployment">
          <h2>Implantação &amp; Scripts</h2>
          <ul>
            <li><code>deploy.js</code> — Implantação ponta-a-ponta dos contratos e adaptadores.</li>
            <li><code>configure-*.js</code> — Onboarding de colateral, parâmetros de risco, oráculos, line/dust.</li>
            <li><code>test-*.js</code> — Fluxos completos do sistema, cenários de liquidação, simulações de keeper.</li>
            <li><code>update-price-feeds.js</code> — Atualizações/pokes dos oráculos.</li>
            <li><code>verify-contracts.js</code> — Verificações no Etherscan ou exploradores.</li>
          </ul>
          <p className="mt-2">Resultados de implantação em <code>deployments/*.json</code>, consumidos pelos frontends.</p>
        </section>

        <section id="subgraph">
          <h2>Subgraph</h2>
          <p>O subgraph indexa eventos de StableCoin, Vat e Dog/Clip.</p>
          <ul>
            <li><code>schema.graphql</code> — Entidades de cofres, leilões e métricas do protocolo.</li>
            <li><code>subgraph.yaml</code> — Fontes de eventos e configuração de mapeamentos.</li>
            <li><code>src/mapping.ts</code> — Handlers que mantém entidades derivadas.</li>
          </ul>
        </section>

        <section id="frontend">
          <h2>Frontends</h2>
          <h3>App Next.js (frontendnew)</h3>
          <ul>
            <li>Integração de carteira via RainbowKit em <code>src/components/providers.tsx</code> e <code>src/lib/wagmi.ts</code>.</li>
            <li>Endereços e ABIs em <code>src/lib/contracts.ts</code>.</li>
            <li>Páginas principais: <code>/</code>, <code>/vaults</code>, <code>/vaults/open</code>, <code>/stake</code>.</li>
            <li>UI via shadcn/ui em <code>src/components/ui/*</code>.</li>
          </ul>
          <h3>App React Legado (frontend)</h3>
          <ul>
            <li>Contém versões antigas de dashboard, gestão de CDP e liquidações.</li>
            <li>Usa configuração wagmi em <code>src/config/wagmi.ts</code> e hooks de contrato.</li>
          </ul>
        </section>

        <section id="config">
          <h2>Configuração</h2>
          <ul>
            <li><code>.env</code> e <code>.env.local</code> — RPCs, chaves privadas, endpoints do subgraph.</li>
            <li><code>hardhat.config.js</code> — Redes e compilador Solidity.</li>
            <li><code>deployments/*.json</code> — Consumidos no frontend via <code>contracts.ts</code>.</li>
            <li>Oráculos e parâmetros em scripts e implementações de <code>PriceFeed.sol</code>.</li>
          </ul>
        </section>

        <section id="dev">
          <h2>Guia do Desenvolvedor</h2>
          <h3>Executar o frontend</h3>
          <ol>
            <li>Na raiz: <code>npm run dev</code> (inicia frontendnew).</li>
            <li>Alternativa: <code>cd frontendnew &amp;&amp; npm run dev</code>.</li>
          </ol>
          <h3>Implantar &amp; configurar</h3>
          <ol>
            <li>Execute <code>node scripts/deploy.js</code> para implantar contratos.</li>
            <li>Execute scripts de configuração (ex.: <code>scripts/configure-system-final.js</code>).</li>
            <li>Atualize <code>frontendnew/src/lib/contracts.ts</code> se os endereços não forem escritos automaticamente.</li>
            <li>Verifique endereços em <code>deployments/*.json</code>.</li>
          </ol>
          <h3>Testes</h3>
          <ul>
            <li>E2E: <code>scripts/test-full-cdp.js</code>, <code>scripts/test-liquidations.js</code>, e variações.</li>
            <li>Unitários: <code>test/Stablecoin.test.js</code>.</li>
          </ul>
        </section>

        <section id="troubleshooting">
          <h2>Solução de Problemas</h2>
          <ul>
            <li>Oráculos sem atualizar: rode <code>scripts/update-price-feeds.js</code>, verifique API3/Chainlink.</li>
            <li>Ações do cofre revertendo: garanta aprovações ao GemJoin/DaiJoin; confira <code>mat</code>, <code>dust</code>, <code>line</code>.</li>
            <li>Liquidações travadas: verifique permissões de Dog/Clip e parâmetros de Calc.</li>
            <li>Endereços divergentes: concilie <code>deployments/*.json</code> e <code>frontendnew/src/lib/contracts.ts</code>.</li>
          </ul>
        </section>

        <section id="glossary">
          <h2>Glossário</h2>
          <ul>
            <li><strong>Ilk</strong> — Configuração do tipo de colateral.</li>
            <li><strong>Urn</strong> — Estrutura de dados do cofre do usuário.</li>
            <li><strong>Frob</strong> — Ajusta colateral e dívida.</li>
            <li><strong>Mat</strong> — Razão de liquidação.</li>
            <li><strong>Spot</strong> — Preço ajustado por risco.</li>
            <li><strong>Dust</strong> — Dívida mínima.</li>
            <li><strong>Line</strong> — Teto de dívida (por ilk e global).</li>
          </ul>
        </section>
      </div>
    </main>
  );
}

