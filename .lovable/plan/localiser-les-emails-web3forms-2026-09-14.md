# Localiser les emails Web3Forms

## Objectif
Chaque formulaire enverra un email dont l’objet, les titres de sections et les noms de champs correspondent à la langue active du site, sans modifier l’affichage ni le fonctionnement des formulaires.

## Modifications
- Dans **Demande sur mesure**, définir les libellés FR/EN de toutes les sections et de tous les champs, notamment les marques moteur/alternateur et le module de contrôle.
- Dans **Contact**, définir les libellés FR/EN du titre de section et de chaque champ envoyé.
- Dans **Générateurs en location**, définir les libellés FR/EN de chaque champ envoyé et localiser l’objet du message.
- Sélectionner le dictionnaire approprié avec `lang` au moment de l’envoi, y compris l’objet et le nom d’expéditeur de remplacement.

## Vérification
- Contrôler les données envoyées par chacun des trois formulaires en français et en anglais.
- Vérifier que le projet se compile sans erreur et que le rendu des formulaires reste inchangé.
