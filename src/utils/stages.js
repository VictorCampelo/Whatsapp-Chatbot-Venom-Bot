var stages = {
  0: {
    descricao: "Boas Vindas",
    obj: require("../../bot/stages/0"),
  },
  1: {
    descricao: "Vendas",
    obj: require("../../bot/stages/1"),
  },
  2: {
    descricao: "Resumo",
    obj: require("../../bot/stages/2"),
  },
  3: {
    descricao: "Endereço",
    obj: require("../../bot/stages/3"),
  },
  4: {
    descricao: "Enceramento",
    obj: require("../../bot/stages/4"),
  },
  5: {
    descricao: "Forma de Pagamento",
    obj: require("../../bot/stages/5"),
  },
};

exports.step = stages;
