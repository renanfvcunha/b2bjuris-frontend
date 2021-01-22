export default {
  cpfMask: (cpf: string): string =>
    cpf
      /* substitui qualquer caracter que nao seja numero por nada */
      .replace(/\D/g, '')
      /* captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos
      capturar o primeiro grupo ele adiciona um ponto antes do segundo
      grupo de numero */
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      /* captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada */
      .replace(/(-\d{2})\d+?$/, '$1'),
  telefoneMask: (telefone: string): string =>
    telefone
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d)(\d{4})$/, '$1-$2'),
  brlMask: (valor: string): string => {
    let val = valor;
    val = val.replace(/\D/g, '');
    val += '';
    val = val.replace(/([0-9]{2})$/g, ',$1');
    if (val.length > 6 && val.length <= 9) {
      val = val.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');
    }
    if (val.length > 9 && val.length <= 12) {
      val = val.replace(/([0-9]{3})([0-9]{3}),([0-9]{2}$)/g, '.$1.$2,$3');
    }
    if (val.length > 12) {
      val = val.replace(
        /([0-9]{3})([0-9]{3})([0-9]{3}),([0-9]{2}$)/g,
        '.$1.$2.$3,$4'
      );
    }
    return val;
  },
  formatBrToEn: (valor: string): string =>
    valor.split('.').join('').split(',').join('.'),
};
