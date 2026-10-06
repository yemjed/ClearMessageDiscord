🧹 ClearMessageDiscord Supprime massivement vos propres messages dans un salon Discord, avec compteur de progression en temps réel.



Script basé sur un selfbot (discord.js-selfbot-v13) — rapide, avec gestion automatique des rate-limits.



⚠️ Avertissement \[!WARNING] L'automatisation d'un compte utilisateur (selfbot) viole les Conditions d'utilisation de Discord.Son utilisation peut entraîner la suspension de votre compte.Utilisez ce script à vos propres risques, de préférence sur un compte secondaire.



📋 Prérequis Node.js 16.11 ou supérieur (télécharger) Mode développeur activé sur Discord :Paramètres → Mode développeur ✅



📦 Installation



Clonez le repository : git clone https://github.com/yemjed/ClearMessageDiscord.gitcd ClearMessageDiscord



Installez les dépendances : npm install discord.js-selfbot-v13



Créez un fichier token.txt à la racine du projet, contenant uniquement votre token sur une seule ligne : VOTRE\_TOKEN\_ICI \[!IMPORTANT]Le fichier doit s'appeler exactement token.txt (attention au piège token.txt.txt de Windows).Aucun guillemet, aucun texte autour — juste le token brut.



🚀 Utilisation node clear.js <channel\_id>



Exemple :



node clear.js 1546252714629926973



Récupérer l'ID d'un salon Activez le mode développeur (voir prérequis) Clic droit sur le salon concerné Copier l'identifiant du salon



Sortie du script \[+] Connecté : votre\_pseudo#0000 \[+] Channel : nom-du-salon 12 supprimés | 0 ignorés | total traité : 12 \[+] Terminé : 12 supprimés, 0 ignorés.

