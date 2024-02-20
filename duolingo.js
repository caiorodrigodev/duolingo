// ==UserScript==
// @name         Duolingo Auto-Practice Aperfeiçoado com Busca por Texto
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatiza a prática de fala no Duolingo, identificando botões pelo texto.
// @author       Seu Nome
// @match        https://www.duolingo.com/practice*
// @grant        none
// @icon         https://d35aaqx5ub95lt.cloudfront.net/favicon.ico
// ==/UserScript==

(function() {
  'use strict';

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const clickByText = async (textArray, selector = 'button, span') => {
      const elements = document.querySelectorAll(selector);
      for (let element of elements) {
          if (textArray.some(text => element.textContent.includes(text))) {
              element.click();
              console.log('Elemento clicado com texto:', element.textContent);
              await delay(500); // Pequeno atraso após o clique
              return; // Sai após o primeiro clique bem-sucedido
          }
      }
  };

  const observerCallback = (mutationsList, observer) => {
      // Simplificando para focar na ação de clique direto
      clickByText(["Continuar", "Clique para falar"]);
  };

  const observerOptions = {
      childList: true,
      subtree: true
  };

  const observer = new MutationObserver(observerCallback);
  observer.observe(document.body, observerOptions);

  // Função inicial para tentativas de ação logo após o carregamento da página
  const init = async () => {
      await clickByText(["Fala", "Continuar", "Clique para falar"]);
  };

  init(); // Execução inicial
})();


(function() {
  'use strict';

  const targetURL = 'https://www.duolingo.com/practice-hub';
  const falaButtonSelector = 'button._1eJKW._16r-S.vJj1P';

  const clickFalaButton = () => {
      if (window.location.href.includes(targetURL)) {
          const falaButton = document.querySelector(falaButtonSelector);
          if (falaButton) {
              falaButton.click();
              console.log('Botão "Fala" clicado.');
          }
      }
  };

  // MutationObserver para detectar mudanças na página
  const observer = new MutationObserver(() => {
      clickFalaButton();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Função para tentar clicar no botão "Fala" periodicamente
  const attemptClickInterval = () => {
      setInterval(() => {
          clickFalaButton();
      }, 5000); // Ajuste este intervalo conforme necessário
  };

  attemptClickInterval(); // Inicia a tentativa de clique em intervalos
})();
