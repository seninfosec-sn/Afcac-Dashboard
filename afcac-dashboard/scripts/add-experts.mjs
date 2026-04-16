import { neon } from "@neondatabase/serverless";
import { readFileSync, writeFileSync } from "fs";
import { loadEnvFile } from "process";

loadEnvFile(".env.local");
const sql = neon(process.env.DATABASE_URL);

const newUsers = [
  { username: "henrique.cahanda",            displayName: "Henrique Cahanda",                    devPassword: "Henrique2025"     },
  { username: "bernardino.carlos",           displayName: "Bernardino Carlos",                   devPassword: "Bernardino2025"   },
  { username: "dansou.elysee",               displayName: "DANSOU Elysee",                       devPassword: "Dansou2025"       },
  { username: "hounsa.firmin",               displayName: "HOUNSA Firmin",                       devPassword: "Hounsa2025"       },
  { username: "sia.lawankilia",              displayName: "Sia Lawankilia",                      devPassword: "Sia2025"          },
  { username: "kabore.alexandre",            displayName: "Kabore Nebnoma Alexandre",            devPassword: "Kabore2025"       },
  { username: "bizimana.jeandedieu",         displayName: "BIZIMANA Jean de Dieu",               devPassword: "Bizimana2025"     },
  { username: "mugabe.dieudonne",            displayName: "MUGABE Dieudonne",                    devPassword: "Mugabe2025"       },
  { username: "nguie.disraely",              displayName: "NGUIE Nietche Disraely",              devPassword: "Nguie2025"        },
  { username: "nguimby.nsemi",               displayName: "NGUIMBY NSEMI Loubyen Charem",        devPassword: "Nguimby2025"      },
  { username: "coulibaly.siramane",          displayName: "Mrs Coulibaly Siramane",              devPassword: "Coulibaly2025"    },
  { username: "koffi.konan",                 displayName: "Mr. KOFFI Konan",                     devPassword: "Koffi2025"        },
  { username: "tanele.sukati",               displayName: "Tanele Sukati",                       devPassword: "Tanele2025"       },
  { username: "sipho.tsabedze",              displayName: "Sipho Tsabedze",                      devPassword: "Sipho2025"        },
  { username: "tadesse.hundie",              displayName: "Tadesse Hundie",                      devPassword: "Tadesse2025"      },
  { username: "misrak.tilahun",              displayName: "Misrak Tilahun",                      devPassword: "Misrak2025"       },
  { username: "aguilar.biahute",             displayName: "Aguilar BIAHUTE Nemesio",             devPassword: "Aguilar2025"      },
  { username: "owono.nchama",                displayName: "OWONO NCHAMA Ajehandro Ona",          devPassword: "Owono2025"        },
  { username: "mvola.ndong",                 displayName: "MVOLA NDONG Toussaint",               devPassword: "Mvola2025"        },
  { username: "maguendji.else",              displayName: "MAGUENDJI Else Laurianne",            devPassword: "Maguendji2025"    },
  { username: "samuel.thompson",             displayName: "Samuel Thompson",                     devPassword: "SamuelT2025"      },
  { username: "samuel.zormelo",              displayName: "Samuel Kojo Zormelo",                 devPassword: "SamuelZ2025"      },
  { username: "loise.mwangi",                displayName: "Loise Wambui Mwangi",                 devPassword: "Loise2025"        },
  { username: "lawrence.amukono",            displayName: "Lawrence Amukono",                    devPassword: "LawrenceA2025"    },
  { username: "philip.whoewieh",             displayName: "Philip K. Whoewieh",                  devPassword: "Philip2025"       },
  { username: "varney.matthews",             displayName: "Varney Matthews",                     devPassword: "Varney2025"       },
  { username: "jaonarifetra.rabenandrasana", displayName: "Jaonarifetra RABENANDRASANA",         devPassword: "Jaonarifetra2025" },
  { username: "mamiarisoa.randriamanana",    displayName: "Mamiarisoa Andry RANDRIAMANANA",      devPassword: "Mamiarisoa2025"   },
  { username: "fredrick.chisepeya",          displayName: "Fredrick Chisepeya",                  devPassword: "Fredrick2025"     },
  { username: "michael.mononga",             displayName: "Michael Mononga",                     devPassword: "Michael2025"      },
  { username: "ousmane.guindo",              displayName: "Ousmane Guindo",                      devPassword: "Ousmane2025"      },
  { username: "nouhoun.diony",               displayName: "Nouhoun Bakary Diony",                devPassword: "Nouhoun2025"      },
  { username: "mohamed.ahmedheye",           displayName: "Mohamed Abdallahi Ahmedheye",         devPassword: "Mohamed2025"      },
  { username: "chamessdine.vadel",           displayName: "Chamessdine Cheikh Mohamed Vadel",    devPassword: "Chamessdine2025"  },
  { username: "celia.langa",                 displayName: "Celia Balate Langa",                  devPassword: "Celia2025"        },
  { username: "arlindo.soto",                displayName: "Arlindo Soto",                        devPassword: "Arlindo2025"      },
  { username: "george.matroos",              displayName: "George Matroos",                      devPassword: "George2025"       },
  { username: "victor.kaurimuje",            displayName: "Victor Kaurimuje",                    devPassword: "Victor2025"       },
  { username: "miko.chaibou",                displayName: "MIKO Chaibou",                        devPassword: "Miko2025"         },
  { username: "mahaman.kanta",               displayName: "MAHAMAN KANTA Kanta",                 devPassword: "Mahaman2025"      },
  { username: "leopoldo.nascimento",         displayName: "Leopoldo do Nascimento",               devPassword: "Leopoldo2025"     },
  { username: "madelayne.veracruz",          displayName: "Madelayne Vera Cruz",                 devPassword: "Madelayne2025"    },
  { username: "john.mbembe",                 displayName: "John Foday Mbembe",                   devPassword: "John2025"         },
  { username: "prince.fillie",               displayName: "Prince Fillie",                       devPassword: "Prince2025"       },
  { username: "mamadou.niang",               displayName: "Mamadou Niang",                       devPassword: "Mamadou2025"      },
  { username: "thioune.niang",               displayName: "Thioune Ndoumbe Niang",               devPassword: "Thioune2025"      },
  { username: "patience.mabasa",             displayName: "Patience Mabasa",                     devPassword: "Patience2025"     },
  { username: "sandile.maphanga",            displayName: "Sandile Maphanga",                    devPassword: "Sandile2025"      },
  { username: "gcinokuhle.mkhonza",          displayName: "Gcinokuhle Mkhonza",                  devPassword: "Gcinokuhle2025"   },
  { username: "johnson.telar",               displayName: "Johnson Marun Telar",                 devPassword: "Johnson2025"      },
  { username: "mayuen.ajuk",                 displayName: "Mayuen Kol Ajuk",                     devPassword: "Mayuen2025"       },
  { username: "dossa.luhindi",               displayName: "Dossa Luhindi",                       devPassword: "Dossa2025"        },
  { username: "mwanaisha.salum",             displayName: "Mwanaisha Salum",                     devPassword: "Mwanaisha2025"    },
  { username: "kelewou.gnimdou",             displayName: "Kelewou Gnimdou",                     devPassword: "Kelewou2025"      },
  { username: "tiassou.kossi",               displayName: "Tiassou Kossi",                       devPassword: "Tiassou2025"      },
  { username: "edgar.guma",                  displayName: "Edgar Guma",                          devPassword: "Edgar2025"        },
  { username: "lillian.lungu",               displayName: "Lillian Lungu",                       devPassword: "Lillian2025"      },
  { username: "william.mfune",               displayName: "William Mfune",                       devPassword: "William2025"      },
  { username: "lawrence.vudzijena",          displayName: "Lawrence Vudzijena",                  devPassword: "LawrenceV2025"    },
  { username: "jacob.sibanda",               displayName: "Jacob Sibanda",                       devPassword: "Jacob2025"        },
].map(u => ({ ...u, role: "expert", passwordHash: "", email: u.username + "@afcac.org", country: "" }));

const current = JSON.parse(readFileSync("../data/users.json", "utf-8"));
const existingUsernames = new Set(current.map(u => u.username));
const toAdd = newUsers.filter(u => !existingUsernames.has(u.username));
const updated = [...current, ...toAdd];

writeFileSync("../data/users.json", JSON.stringify(updated, null, 2));
writeFileSync("data/users.json", JSON.stringify(updated, null, 2));

await sql`INSERT INTO afcac_kv (key, value) VALUES ('users', ${JSON.stringify(updated)}::jsonb)
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`;

console.log(`OK ${toAdd.length} new expert accounts added (${updated.length} total)`);
