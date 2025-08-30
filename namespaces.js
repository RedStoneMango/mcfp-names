export const namespaces = [
    {
        "tag": "data",
        "nutzung": "Genereller Data-Holder des Parks",
        "anmerkung": "Wird in mehreren Kontexten abgerufen, Nutzung lässt sich nicht auf eine Attraktion beschränken",
        "tagroot": false,
        "scoreroot": true
    },
    {
        "tag": "parkbahn",
        "nutzung": "Die <i>Parkbahn</i> des Freizeitparks",
        "anmerkung": "Sowohl <i>v1</i> als auch <i>v2</i> der Parkbahn fallen unter diesen Tag, allerdings wurden die Überreste der <i>v1</i> deaktiviert, es gibt keinen bekannten Ort, an dem sich aktuell ein <i>Parkbahn v1</i> Element mit dieser Namespace befindet.",
        "tagroot": true,
        "scoreroot": true
    },
    {
        "tag": "train",
        "nutzung": "Teile der <i>Parkbahn v1</i>",
        "anmerkung": "Diese Version Bahn ist zwar nicht mehr aktuell, der Score müsste technisch gesehen aber immernoch existieren. Die <i>Parkbahn v2</i> nutzt ausschließlich die Namespace <code>Parkbahn</code>, sodass diese Namespace eigentlich nicht mehr aktiv verwendet wird.",
        "tagroot": false,
        "scoreroot": true
    },
    {
        "tag": "1s_clock",
        "nutzung": "Die immeraktive <i>1-Sekunden-Clock</i> des Parks",
        "anmerkung": "Es existieren ebenfalls Clocks für 2,5,10 Sekunden, sowie die Art der <i>\"Detect-Clocks\"</i>",
        "tagroot": true,
        "scoreroot": false
    },
    {
        "tag": "2s_clock",
        "nutzung": "Die immeraktive <i>2-Sekunden-Clock</i> des Parks",
        "anmerkung": "Es existieren ebenfalls Clocks für 1,5,10 Sekunden, sowie die Art der <i>\"Detect-Clocks\"</i>",
        "tagroot": true,
        "scoreroot": false
    },
    {
        "tag": "5s_clock",
        "nutzung": "Die immeraktive <i>5-Sekunden-Clock</i> des Parks",
        "anmerkung": "Es existieren ebenfalls Clocks für 1,2,10 Sekunden, sowie die Art der <i>\"Detect-Clocks\"</i>",
        "tagroot": true,
        "scoreroot": false
    },
    {
        "tag": "10s_clock",
        "nutzung": "Die immeraktive <i>10-Sekunden-Clock</i> des Parks",
        "anmerkung": "Es existieren ebenfalls Clocks für 1,2,5 Sekunden, sowie die Art der <i>\"Detect-Clocks\"</i>",
        "tagroot": true,
        "scoreroot": false
    },
    {
        "tag": "2s_detect_clock",
        "nutzung": "Die, nur in Spielernähe aktive, <i>2-Sekunden-Clock</i> des Parks",
        "anmerkung": "Es existiert ebenfalls eine Clock für 5 Sekunden, sowie die Art der <i>\"Immeraktiven-Clocks\"</i>",
        "tagroot": true,
        "scoreroot": false
    },
    {
        "tag": "5s_detect_clock",
        "nutzung": "Die, nur in Spielernähe aktive, <i>5-Sekunden-Clock</i> des Parks",
        "anmerkung": "Es existiert ebenfalls eine Clock für 2 Sekunden, sowie die Art der <i>\"Immeraktiven-Clocks\"</i>",
        "tagroot": true,
        "scoreroot": false
    },
    {
        "tag": "pianotiles",
        "nutzung": "Das Spiel <i>Pianotiles</i>",
        "anmerkung": "--",
        "tagroot": true,
        "scoreroot": true
    },
    {
        "tag": "speaker",
        "nutzung": "Die imaginären \"Lautsprecher\" zum Musikabspielen am Eingangs-Plateau",
        "anmerkung": "--",
        "tagroot": true,
        "scoreroot": true
    },
    {
        "tag": "temp",
        "nutzung": "Logiken zum <i>Freizeitparkeingang</i>",
        "anmerkung": "Lässt sich unterteilen in die Unterkategorien <i>temp.intro</i> und <i>temp.ticketcheck</i>. Beide werden nur für Scores verwendet",
        "tagroot": false,
        "scoreroot": true
    },
    {
        "tag": "logflume",
        "nutzung": "Die <i>Story-Wildwasserbahn im Maja-Theme</i>",
        "anmerkung": "Die einzelnen Animationskammern sind nach dem Prinzip <i>logflume_storyN</i> benannt, wobei <strong>N</strong> die Nummer der Animation in chronologischer Reihenfolge ist. Die Charaktere James und Gizmo werden mit <i>j</i> und <i>g</i> abgekürzt",
        "tagroot": true,
        "scoreroot": true
    },
    {
        "tag": "tale",
        "nutzung": "Die <i>optische Feen-Logik</i> für das Biom der \"Märchenschmiede\"",
        "anmerkung": "Wir meinen uns zu erinnern, dass Jo mal meinte, er wolle diese Technik umschreiben / komplett entfernen, konnten im Nachhinein jedoch keine Beweise für dieses Gespräch finden.",
        "tagroot": true,
        "scoreroot": false
    },
    {
        "tag": "mgo1",
        "nutzung": "Das <i>Pferde-Dressur-Reiten</i> des Parks",
        "anmerkung": "--",
        "tagroot": true,
        "scoreroot": false
    },
    {
        "tag": "ink",
        "nutzung": "Das <i>Montagsmaler</i>-Spiel des Parks",
        "anmerkung": "--",
        "tagroot": true,
        "scoreroot": true
    },
    {
        "tag": "waterrace",
        "nutzung": "Der <i>Waterracer</i> (\"Mario-Kart im Wasser\")",
        "anmerkung": "Die Scores für dieses Spiel befinden sich in der Namespace <code>wr</code>",
        "tagroot": true,
        "scoreroot": false
    },
    {
        "tag": "wr",
        "nutzung": "Der <i>Waterracer</i> (\"Mario-Kart im Wasser\")",
        "anmerkung": "Die Tags für dieses Spiel befinden sich in der Namespace <code>waterrace</code>",
        "tagroot": false,
        "scoreroot": true
    },
    {
        "tag": "boatbridge",
        "nutzung": "Das <i>\"Boatbridge über Lava\"</i>-Spiel",
        "anmerkung": "Jo meine mehrfach, er sei mit diesem Spiel unzufrieden und plane, es mit den HappyGhasts neu zu bauen.<p>Dieses Spiel benötigt technisch gesehen zwar ein Scoreboard, allerdings lässt sich nicht mehr nachvollziehen, welchen Namen dieses hat, weshalb in dieser Liste davon ausgegangen wird, dass Jo die Werte im <code>data</code>-Score speichert",
        "tagroot": true,
        "scoreroot": false
    },
    {
        "tag": "uf",
        "nutzung": "Das Spiel <i>\"Unendlicher Fall\"</i>",
        "anmerkung": "--",
        "tagroot": true,
        "scoreroot": true
    },
    {
        "tag": "hdu",
        "nutzung": "Die <i>\"Höhle der Umkehr\"</i>",
        "anmerkung": "Die Technik dieses Projektes wurde zwar abgerissen, allerdings existiert nach wie vor der \"hdu\"-Score",
        "tagroot": false,
        "scoreroot": true
    },
    {
        "tag": "stand",
        "nutzung": "Die <i>Essensstände</i> die man überall im Park finden kann",
        "anmerkung": "Das Neuladen der Stände kann mit <code>scoreboard objectives reset * stand.reload</code> herbeigeführt werden",
        "tagroot": true,
        "scoreroot": true
    },
    {
        "tag": "kontrolleur",
        "nutzung": "Der Eisengolem <i>\"Hans\"</i> am Eingang des Freizeitparks und die dazugehörige Logik",
        "anmerkung": "--",
        "tagroot": true,
        "scoreroot": false
    },
    {
        "tag": "ws",
        "nutzung": "Die <i>Wassershow</i> vor dem Parkhotel",
        "anmerkung": "--",
        "tagroot": true,
        "scoreroot": true
    },
    {
        "tag": "ha",
        "nutzung": "Die große <i>Holzachterbahn</i>",
        "anmerkung": "--",
        "tagroot": true,
        "scoreroot": true
    },
    {
        "tag": "ff",
        "nutzung": "Das <i>Freefall-Kino</i> mit LOGO",
        "anmerkung": "--",
        "tagroot": true,
        "scoreroot": true
    },
    {
        "tag": "wesc",
        "nutzung": "Das Spiel <i>Warden Escape</i> (<i>aka Subwaysurfer, aka TempleRun</i>)",
        "anmerkung": "--",
        "tagroot": true,
        "scoreroot": true
    }
];
