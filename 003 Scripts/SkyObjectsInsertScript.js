// dépendances
const fs = require('fs');
LineReaderSync = require("line-reader-sync");

// nom des fichiers
const dataFile = './files/messier.csv';
const sqlFileScript = './files/insertMessierObjects';
const sqlFileExtension = '.sql';


// Liste des index des champs qui nous intéressent
const messier = 0;
const ngc = 1;
const objectType = 2;
const season = 3;
const magnitude = 4;
const constellation = 5;
const rightAscension = 6;
const declination = 7;
const distanceLY = 8;
const apparentSize = 9;
const discoverer = 10;
const discoveryYear = 11;
const constellationAbbr = 12;
const description = 13;


// taille du paquet
// one file : 120000
// server linux : 20000
let packetSize = 120000;

// numero de fichier
let numeroFichier = 0

// initialisation index
let id = 0;

// contenu d'une ligne dans le fichier
var line;

// affichage début du traitement
console.log("Running the script. This will take a couple of seconds...")

// récuperation du nombre de lignes dans le fichier
let numberLines = getNumberLines(dataFile);

// ouverture du fichier csv
var dataFileLine = new LineReaderSync(dataFile);

// traitement du fichier
while (id < numberLines)
{
    // récupération de la ligne
    line = dataFileLine.readline();

    if (id%packetSize === 0)
    {
        // ouverture du fichier
        var fileHandle = openFile(sqlFileScript + numeroFichier + sqlFileExtension);

        // debut de la requête d'insertion
        var headerQueryString =  'insert into MessierObjects (id, name, ngc, objectType, season, constellation, constellationAbbr, magnitude, rightAscension, declination, distanceLY, apparentSizeArcSec, discoverer, discoveryYear, description) \nvalues\n';
        // on sauvegarde dans le fichier script sql
        saveData(fileHandle,headerQueryString);

        numeroFichier++;
    }

    // on ne prend pas en compte la première ligne
    if (id > 0)
    {
        // récupération des données sous forme de tableau de valeurs
        let messierData = line.split(';');

        // on traite chaque champ pour le mettre à null si valeur vide
        // for (let i=0; i<messierData.length;i++)
        // {
        //     if (messierData[i])
        //         messierData[i] = (messierData[i].toString()).replace("'", "''");
        //     else
        //         messierData[i] = "null";
        // }

        // construction de la ligne de données
        subQueryString = "(" + id.toString()
                        + ",'" + messierData[messier]                           + "'" 
                        + ",'" + messierData[ngc]                                + "'"
                        + ",'" + messierData[objectType]                         + "'"
                        + ",'" + messierData[season]                             + "'"
                        + ",'" + messierData[constellation]                     + "'"
                        + ",'" + messierData[constellationAbbr]                  + "'"
                        + ",'" + messierData[magnitude]                          + "'"
                        + ",'" + messierData[rightAscension]                     + "'"
                        + ",'" + messierData[declination]                        + "'"
                        + ",'" + messierData[distanceLY]                         + "'"
                        + ",'" + messierData[apparentSize]                       + "'"
                        + ",'" + messierData[discoverer]                         + "'"
                        + ",'" + messierData[discoveryYear]                      + "'"
                        + ",'" + ""                                              + "')"                                


        // on rajoute la virgule et nouvelle ligne en fin de ligne si ce n'est pas la dernière ligne de valeurs
        if (id%packetSize !== (packetSize - 1) && (id !== (numberLines-1)))
            subQueryString += "," + "\n";

        // on remplace 'null' par null :
        //subQueryString = subQueryString.replace(/'null'/g, "null");
        
        // on sauvegarde dans le fichier script sql
        saveData(fileHandle,subQueryString);
    }

    // incrémentation de l'index pour la ligne suivante
    id++;  
}


// retourne le nombre de lignes dans un fichier
function getNumberLines(filename)
{
    // init des variables
    let flagEOF = false;
    let compteur = 0;

    // overture du fichier
    lrs = new LineReaderSync(filename);

    // tant qu'on n'arrive pas à la fin du fichier
    while (lrs.readline())
        compteur++;

    return compteur;
}

// ouverture du fichier pour readline
function openFile(filename)
{
    return new LineReaderSync(filename);
}

/* 
    Fonctions d'accès au fichier
    ============================
*/

// ouvre le fichier
function openFile(filename)
{
    return fs.createWriteStream(filename, {flags:'a'});
}

// sauvegarde dans le fichier
function saveData(stream, sqlString)
{
    stream.write(sqlString);
}
