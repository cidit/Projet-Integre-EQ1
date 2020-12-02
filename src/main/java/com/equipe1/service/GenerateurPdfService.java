package com.equipe1.service;

import com.equipe1.model.Employeur;
import com.equipe1.model.Etudiant;
import com.equipe1.model.Stage;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import static java.time.temporal.ChronoUnit.DAYS;

@Service
public class GenerateurPdfService {

    private final int FONT_TAILLE_TITRE = 16;
    private final int FONT_TAILLE_REGULIER = 14;

    @Autowired
    private Environment env;


    public ByteArrayOutputStream createPdf(Stage s, Employeur employeur, Etudiant etudiant) throws Exception {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        Document document = new Document();
        PdfWriter writer = PdfWriter.getInstance(document, out);
        // Document document = new Document(PageSize.A4);
        // PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream("/home/carlos/Documents/test.pdf"));
        document.open();

        String text2 = " Le CÉGEP ANDRÉ-LAURENDEAU, corporation légalement constituée, situé au" +
                " 1111, rue Lapierre, LASALLE (Québec), H8N 2J4, ici représenté par Madame Diane Turcotte" +
                " ci-après désigné «Le Collège»,  l’entreprise ";
        String text3 = "ayant sa place d’affaires à ";
        document.add(getImage());
        document.add(setTitre("ENTENTE DE STAGE COOPÉRATIF"));
        document.add(setParagraphe(Arrays.asList(
                setPhrase("Dans le cadre de la formule Alternance travail-études du programme de ", false),
                setPhrase(s.getProgramme(), true),
                setPhrase(text2, false),
                setPhrase(text3, false),
                setPhrase(s.getVille() + " ,", true),
                setPhrase(" à l'adresse: ", false),
                setPhrase(employeur.getAdresse() + " ,", true),
                setPhrase(" au téléphone ", false),
                setPhrase(employeur.getTelephone() + " ,", true),
                setPhrase(" et l'étudiant ", false),
                setPhrase(etudiant.getPrenom() + " " + etudiant.getNom() + " ,", true),
                setPhrase("conviennent des conditions de stage suivantes : ", false)
        )));

        //create table
        document.add(tableTitre("EMPLACEMENT DU STAGE"));

        document.add(createTable(Arrays.asList(
                createBoldCell("Ville: ", s.getVille(), setFond(FONT_TAILLE_REGULIER, true)),
                createBoldCell("Adresse: ", employeur.getAdresse(), setFond(FONT_TAILLE_REGULIER, true)),
                createBoldCell("Téléphone: ", employeur.getTelephone(), setFond(FONT_TAILLE_REGULIER, true)),
                createBoldCell("Courriel: ", employeur.getEmail(), setFond(FONT_TAILLE_REGULIER, true))
        ), 2, false));

        document.add(tableTitre("MODALITÉ DE SUPERVISION DU STAGIAIRE"));

        document.add(createTable(Arrays.asList(createBoldCell("Nombre d’heures /semaine prévu: ",
                "10", setFond(FONT_TAILLE_REGULIER, true))), 1, false));

        document.add(tableTitre("DÉTAILS DU STAGE"));

        document.add(createTable(Arrays.asList(
                createBoldCell("Date de début : ", s.getDateDebut().toString(), setFond(FONT_TAILLE_REGULIER, true)),
                createBoldCell("Date de fin : ", s.getDateFin().toString(), setFond(FONT_TAILLE_REGULIER, true)),
                createBoldCell("Nombre total de semaines : ", getDureStage(s).toString(), setFond(FONT_TAILLE_REGULIER, true)),
                createBoldCell("Salaire : ", String.valueOf(s.getSalaire()) + "$/h", setFond(FONT_TAILLE_REGULIER, true))
                ), 2, false)
        );

        //liste taches et responsabilites
        document.add(subtitre(setFond(FONT_TAILLE_REGULIER, true), "TÂCHES ET RESPONSABILITÉS DU STAGIAIRE"));

        document.add(setListOrdonee(Arrays.asList(
                "Modéliser, implémenter de nouvelles fonctionnalités dans les logiciels de l'entreprise. ",
                "Définir et automatiser les tests de certains aspects fonctionnels et non-fonctionnels de la solution en collaboration " +
                        "avec le département d’assurance qualité.", "Participer à l’investigation et la résolution de bogues reliés à la " +
                        "solution.",
                "Supporter l’équipe des développeurs dans la réalisation de fonctionnalités complexes.",
                "Supporter la migration des clients existants pour des fonctionnalités complexes."
        )));

        document.add(subtitre(setFond(FONT_TAILLE_REGULIER, true), "RESPONSABILITÉS"));
        document.add(subtitre(setFond(FONT_TAILLE_REGULIER, true), "Le Collège s’engage à :"));

        document.add(setListOrdonee(Arrays.asList(
                "Fournir à l’entreprise tous les renseignements concernant les conditions spécifiques du programme " +
                        "d’études et du programme d’alternance travail études.",
                "Collaborer, au besoin, à la définition du plan de stage.",
                "Effectuer un suivi de l’étudiant stagiaire pendant la durée du stage.",
                "Fournir à l’entreprise les documents nécessaires à l’évaluation de l’étudiant stagiaire.",
                "Collaborer avec l’entreprise pour résoudre des problèmes qui pourraient survenir en cours de stage, le cas échéant.",
                "Conserver tous les dossiers de stage et les rapports des étudiants.",
                "Fournir à l’entreprise le formulaire d’attestation de participation à un stage " +
                        "de formation admissible après réception du formulaire « Déclaration " +
                        "Relative au crédit d’impôt remboursable pour les stages »."
        )));

        document.add(subtitre(setFond(FONT_TAILLE_REGULIER, true), "L’entreprise s’engage à :"));

        document.add(setListOrdonee(Arrays.asList(
                //TODO: CA VEUT DIRE QUOI?
                "test desde responsablity",
                "Embaucher l’étudiant stagiaire  aux conditions précisées dans la présente entente.",
                "Désigner un superviseur de stage qui assurera l’encadrement de l’étudiant stagiaire pour toute la durée du stage.",
                "Mettre en place des mesures d’accueil, d’intégration et d’encadrement de l’étudiant stagiaire.",
                "Procéder à l’évaluation de l’étudiant stagiaire."
        )));

        document.add(subtitre(setFond(FONT_TAILLE_REGULIER, true), "L’étudiant s’engage:"));
        document.add(setListOrdonee(Arrays.asList(
                "Assumer de façon responsable et sécuritaire, les tâches qui lui sont confiées.",
                "Respecter les politiques, règles et procédures de l’entreprise ainsi que l’horaire de travail au même titre qu’un employé.",
                "Respecter les dates de début et de fin de stage, à moins d'une entente avec l'étudiant.",
                "Référer rapidement au responsable des stages du cégep pour toute situation " +
                        "problématique affectant le bon déroulement du stage;"
        )));

        document.add(subtitre(setFond(FONT_TAILLE_REGULIER, false), "Les parties s’engagent à respecter cette entente de stage " +
                "en foi de quoi les parties ont signé, "));

        document.add(subtitre(setFond(FONT_TAILLE_REGULIER, true), "Signatures "));
        document.add(Chunk.NEWLINE);

        //Signatures
        document.add(createTable(Arrays.asList(
                createBoldCell("Pour l’entreprise", "", setFond(FONT_TAILLE_REGULIER, true)),
                createBoldCell("Date", "", setFond(FONT_TAILLE_REGULIER, true)),
                createBoldCell("L’étudiant", "", setFond(FONT_TAILLE_REGULIER, true)),
                createBoldCell("Date", "", setFond(FONT_TAILLE_REGULIER, true)),
                createBoldCell("Pour le Collège", "", setFond(FONT_TAILLE_REGULIER, true)),
                createBoldCell("Date", "", setFond(FONT_TAILLE_REGULIER, true))
                ), 2, true)
        );
        document.close();
        writer.close();
        return out;
    }

    private com.itextpdf.text.List setListOrdonee(List<String> line) {
        com.itextpdf.text.List taches = new com.itextpdf.text.List(false, 8);
        for (String l : line) {
            taches.add(l);
        }
        return taches;
    }

    private Paragraph setTitre(String s2) {
        Paragraph title = new Paragraph(s2, setFond(FONT_TAILLE_TITRE, true));
        title.setAlignment(Element.TITLE);
        title.setSpacingAfter(20);
        return title;
    }

    private Image getImage() throws BadElementException, IOException {
        Image image1 = Image.getInstance("src/main/resources/static/images/logoCegep.jpg");
        image1.scaleAbsolute(120, 60);
        image1.setAlignment(Element.IMGTEMPLATE);
        return image1;
    }

    private Paragraph subtitre(Font fontRegularBold, String text) {
        final float SPACE_APRES = 10f;
        final float SPACE_BEFORE = 10f;
        Paragraph program = new Paragraph(text, fontRegularBold);
        program.setAlignment(Element.ALIGN_LEFT);
        program.setSpacingAfter(SPACE_APRES);
        program.setSpacingBefore(SPACE_BEFORE);
        return program;
    }

    private Long getDureStage(Stage s) {
        Long days = DAYS.between(s.getDateDebut(), s.getDateFin());
        return days;
    }

    private Paragraph createBoldCell(String title, String data, Font fontRegularBold) {
        Paragraph paragraph = new Paragraph();
        Phrase phrase = new Phrase(title, fontRegularBold);
        paragraph.add(phrase);
        paragraph.add(data);
        return paragraph;
    }

    private PdfPTable tableTitre(String titre) {
        PdfPTable table2 = new PdfPTable(1);
        table2.setWidthPercentage(100);
        table2.setSpacingBefore(10f);

        PdfPCell cell1 = new PdfPCell(new Paragraph(titre));
        cell1.setPadding(10);
        cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
        cell1.setVerticalAlignment(Element.ALIGN_MIDDLE);
        cell1.setBackgroundColor(BaseColor.LIGHT_GRAY);
        table2.addCell(cell1);
        return table2;

    }

    private PdfPTable createTable(List<Paragraph> paragraphs, int numColumns, boolean isSignature) {
        final float LARGEUR_TABLE = 100f;
        PdfPTable table = new PdfPTable(numColumns);
        table.setWidthPercentage(LARGEUR_TABLE);


        for (int i = 0; i < paragraphs.size(); i++) {
            PdfPCell cell2 = new PdfPCell(paragraphs.get(i));
            cell2.setPaddingBottom(10);
            if (isSignature) {
                cell2.setPaddingBottom(50);
                cell2.setBorder(1);

            }

            cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
            cell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
            table.addCell(cell2);
        }
        return table;
    }

    private Font setFond(int taille, boolean isBold) {
        return new Font(Font.FontFamily.TIMES_ROMAN, taille, isBold ? Font.BOLD : Font.NORMAL);
    }

    private Phrase setPhrase(String mot, boolean isGras) {
        return new Phrase(mot, setFond(FONT_TAILLE_REGULIER, isGras));
    }

    private Paragraph setParagraphe(List<Phrase> phrases) {
        Paragraph paragraph = new Paragraph();
        paragraph.addAll(phrases);
        return paragraph;
    }

}
