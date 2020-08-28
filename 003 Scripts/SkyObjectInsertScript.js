// dépendances
const fs = require('fs');
LineReaderSync = require("line-reader-sync");

// nom des fichiers
const dataFile = './files/hygdata_v3.csv';
const sqlFileScript = './files/insertSkyObjects';
const sqlFileExtension = '.sql';


// Liste des index des champs qui nous intéressent
const hipId = 1;
const harvardId = 2;
const harvardRevisedId = 3;
const glieseId = 4;
const bayerFlamsteedId = 5;
const properName = 6;
const rightAscension = 7;
const declination = 8;
const numDistancePC = 9;
const numRadialVelocity = 12;
const numVisualMagnitude = 13;
const numAbsoluteMagnitude = 14;
const spectralType = 15;
const numColorIndex = 16;
const constellationAbbr = 29;
const numLuminosity = 33;
const variableStarLabel = 34;
const numVariableMinMag = 35;
const numVariableMaxMag = 36;

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
        var headerQueryString =  'insert into SkyObjects (id, hipId, harvardId, harvardRevisedId, glieseId, bayerFlamsteedId, rightAscension, declination, properName, objectTypeId, distancePC, radialVelocity, visualMagnitude, absoluteMagnitude, spectralType, ColorIndex, constellationAbbr, luminosity, variableStarLabel, variableMinMag, variableMaxMag) \nvalues\n';
        // on sauvegarde dans le fichier script sql
        saveData(fileHandle,headerQueryString);

        numeroFichier++;
    }

    // on ne prend pas en compte la première ligne
    if (id > 0)
    {
        // récupération des données sous forme de tableau de valeurs
        let starsData = line.split(',');

        // on traite chaque champ pour le mettre à null si valeur vide
        for (let i=0; i<starsData.length;i++)
        {
            if (starsData[i])
                starsData[i] = (starsData[i].toString()).replace("'", "''");
            else
                starsData[i] = "null";
        }

        // construction de la ligne de données
        subQueryString = "(" + id.toString() 
                        + ",'" + starsData[hipId]                            + "'" 
                        + ",'" + starsData[harvardId]                        + "'"
                        + ",'" + starsData[harvardRevisedId]                 + "'"
                        + ",'" + starsData[glieseId]                         + "'"
                        + ",'" + starsData[bayerFlamsteedId]                 + "'"
                        + ",'" + starsData[rightAscension]                   + "'"
                        + ",'" + starsData[declination]                      + "'"
                        + ",'" + starsData[properName]                       + "'"
                        + ","  + "null"                                      
                        + ","  + starsData[numDistancePC]                    
                        + ","  + starsData[numRadialVelocity]                
                        + ","  + starsData[numVisualMagnitude]               
                        + ","  + starsData[numAbsoluteMagnitude]             
                        + ",'" + starsData[spectralType]                     + "'"
                        + ","  + starsData[numColorIndex]                    
                        + ",'" + starsData[constellationAbbr]                + "'"
                        + ","  + starsData[numLuminosity]                    
                        + ",'" + starsData[variableStarLabel]                + "'"
                        + ","  + starsData[numVariableMinMag]                
                        + ","  + starsData[numVariableMaxMag]                + ")" 

        // on rajoute la virgule et nouvelle ligne en fin de ligne si ce n'est pas la dernière ligne de valeurs
        if (id%packetSize !== (packetSize - 1) && (id !== (numberLines-1)))
            subQueryString += "," + "\n";

        // on remplace 'null' par null :
        subQueryString = subQueryString.replace(/'null'/g, "null");
        
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
