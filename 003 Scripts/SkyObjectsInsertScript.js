// dépendances
const fs = require('fs');
LineReaderSync = require("line-reader-sync");

// nom des fichiers
const dataFile = './files/ngc.csv';
const sqlFileScript = './files/insertNGCObjects';
const sqlFileExtension = '.sql';


// Liste des index des champs qui nous intéressent
const name = 0;
const objectType = 1;
const magnitude = 8;
const constellationAbbr = 4;
const rightAscension = 2;
const declination = 3;
const majax = 5;
const minax = 6;
const posang = 7;
const NGC = 9;
const commonName = 11;


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
        var headerQueryString =  'insert into NGCObjects (id, name, objectType, magnitude, constellationAbbr, rightAscension, declination, majAc, minAx, posAng, NGC, commonName, description) \nvalues\n';
        // on sauvegarde dans le fichier script sql
        saveData(fileHandle,headerQueryString);

        numeroFichier++;
    }

    // on ne prend pas en compte la première ligne
    if (id >= 5616)
    {
        // récupération des données sous forme de tableau de valeurs
        let messierData = line.split(';');

        // on traite chaque champ pour le mettre à null si valeur vide
        for (let i=0; i<messierData.length;i++)
        {
            if (messierData[i])
                messierData[i] = (messierData[i].toString()).replace("'", "''");
            else
                messierData[i] = "null";
        }

        // construction de la ligne de données
        subQueryString = "(" + id.toString()
                        + ",'" + messierData[name]                               + "'" 
                        + ",'" + messierData[objectType]                         + "'"
                        + "," +  messierData[magnitude]                           + ""
                        + ",'" + messierData[constellationAbbr]                  + "'"
                        + ",'" + messierData[rightAscension]                     + "'"
                        + ",'" + messierData[declination]                        + "'"
                        + ",'" + messierData[majax]                         + "'"
                        + ",'" + messierData[minax]                       + "'"
                        + ",'" + messierData[posang]                         + "'"
                        + ",'" + messierData[NGC]                      + "'"
                        + ",'" + ""                      + "'"
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
