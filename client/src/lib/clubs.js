export default function getClub(club) {
  const clubNames = {
    hsv_hamburg: 'Hamburger SV',
    sv_werder: 'SV Werder Bremen',
    fc_bayern: 'FC Bayern München',
    fc_schalke: 'FC Schalke 04',
    tsg_hoffenheim: 'TSG 1899 Hoffenheim',
    sge_frankfurt: 'SG Eintracht Frankfurt',
    sc_freiburg: 'SC Freiburg',
    rb_leipzig: 'Brausedosen',
  };

  return clubNames[club];
}
