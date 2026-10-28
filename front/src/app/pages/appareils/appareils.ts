
import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppareilService, Appareil } from '../../services/appareil';

@Component({
  selector: 'app-appareils',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appareils.html',
  styleUrl: './appareils.css'
})
export class Appareils implements OnInit {
  private appareilService = inject(AppareilService);
  private cdr = inject(ChangeDetectorRef);

  appareils: Appareil[] = [];
  chargement = true;
  erreur = '';
  afficherFormulaire = false;
  enregistrement = false;
  messageSucces = '';

  // Variables pour l'ajout et la modification
  modeModification = false;
  appareilEnCoursId: string | null = null;

  nouvelAppareil: Omit<Appareil, '_id'> = this.formulaireVide();

  private formulaireVide(): Omit<Appareil, '_id'> {
    return {
      nom: '',
      marque: '',
      categorie: '',
      description: '',
      prix: 0,
      statut: 'Off'
    };
  }

  ngOnInit(): void {
    this.chargerAppareils();
  }

  // Charger tous les appareils
  chargerAppareils(): void {
    this.chargement = true;
    this.erreur = '';

    this.appareilService.getAll().subscribe({
      next: (donnees) => {
        this.appareils = donnees;
        this.chargement = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur de chargement :', err);
        this.erreur =
          'Impossible de charger les appareils. Vérifiez que l’API fonctionne.';
        this.chargement = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Ouvrir le formulaire en mode ajout
  ouvrirFormulaire(): void {
    this.nouvelAppareil = this.formulaireVide();
    this.modeModification = false;
    this.appareilEnCoursId = null;
    this.messageSucces = '';
    this.erreur = '';
    this.afficherFormulaire = true;
  }

  // Ouvrir le formulaire avec les informations de l'appareil à modifier
  modifierAppareil(appareil: Appareil): void {
    if (!appareil._id) {
      this.erreur = 'Identifiant de l’appareil introuvable.';
      return;
    }

    this.nouvelAppareil = {
      nom: appareil.nom,
      marque: appareil.marque,
      categorie: appareil.categorie,
      description: appareil.description || '',
      prix: appareil.prix,
      statut: appareil.statut
    };

    this.appareilEnCoursId = appareil._id;
    this.modeModification = true;
    this.messageSucces = '';
    this.erreur = '';
    this.afficherFormulaire = true;
  }

  // Fermer le formulaire
  annulerAjout(): void {
    this.afficherFormulaire = false;
    this.modeModification = false;
    this.appareilEnCoursId = null;
    this.erreur = '';
  }

  // Enregistrer : ajout ou modification selon le mode choisi
  enregistrerAppareil(): void {
    this.erreur = '';
    this.messageSucces = '';

    if (
      !this.nouvelAppareil.nom.trim() ||
      !this.nouvelAppareil.marque.trim() ||
      !this.nouvelAppareil.categorie.trim() ||
      !Number.isFinite(Number(this.nouvelAppareil.prix)) ||
      Number(this.nouvelAppareil.prix) < 0
    ) {
      this.erreur =
        'Vérifiez les champs obligatoires et saisissez un prix positif ou nul.';
      return;
    }

    const donnees: Omit<Appareil, '_id'> = {
      ...this.nouvelAppareil,
      nom: this.nouvelAppareil.nom.trim(),
      marque: this.nouvelAppareil.marque.trim(),
      categorie: this.nouvelAppareil.categorie.trim(),
      description: this.nouvelAppareil.description.trim(),
      prix: Number(this.nouvelAppareil.prix)
    };

    this.enregistrement = true;

    const requete = this.modeModification && this.appareilEnCoursId
      ? this.appareilService.update(this.appareilEnCoursId, donnees)
      : this.appareilService.create(donnees);
      const etaitModification = this.modeModification;

    requete.subscribe({
      next: () => {
        this.enregistrement = false;
        this.afficherFormulaire = false;
        this.modeModification = false;
        this.appareilEnCoursId = null;
        this.nouvelAppareil = this.formulaireVide();

        this.messageSucces = etaitModification
  ? 'Appareil modifié avec succès !'
  : 'Appareil ajouté avec succès !';

        this.chargerAppareils();
      },
      error: (err) => {
        console.error('Erreur lors de l’enregistrement :', err);
        this.enregistrement = false;
        this.erreur =
          err.error?.message || 'Impossible d’enregistrer cet appareil.';
        this.cdr.detectChanges();
      }
    });
  }

  // Inverser les statuts de tous les appareils
  changerTousLesStatuts(): void {
    this.appareilService.switchAll().subscribe({
      next: () => this.chargerAppareils(),
      error: (err) => {
        console.error('Erreur lors du changement des statuts :', err);
        this.erreur = 'Impossible de changer les statuts.';
        this.cdr.detectChanges();
      }
    });
  }

  // Supprimer un appareil
  supprimerAppareil(id: string | undefined): void {
    if (!id) return;

    if (confirm('Voulez-vous vraiment supprimer cet appareil ?')) {
      this.appareilService.delete(id).subscribe({
        next: () => {
          this.messageSucces = 'Appareil supprimé avec succès.';
          this.chargerAppareils();
        },
        error: (err) => {
          console.error('Erreur de suppression :', err);
          this.erreur = 'Impossible de supprimer cet appareil.';
          this.cdr.detectChanges();
        }
      });
    }
  }
}
