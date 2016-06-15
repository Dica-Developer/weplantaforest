package org.dicadeveloper.weplantaforest.projects.offer;

import org.dicadeveloper.weplantaforest.common.support.StringHelper;
import org.dicadeveloper.weplantaforest.user.User;

public class ProjectOfferHelper {

    protected static String createSubject(String name, String mail) {
        return "[Projekt Angebot] " + name + " " + mail;
    }

    protected static String createMailText(ProjectOfferData projectOffer, User user) {
        final StringBuilder text = new StringBuilder();

        if (user != null) {
            text.append("User: " + user + "\n");
        }

        text.append("Name: " + projectOffer.getName() + "\n");

        final String first = projectOffer.getFirst();
        if (!StringHelper.isEmpty(first)) {
            text.append("Vorname: " + first + "\n");
        }

        text.append("E-Mail: " + projectOffer.getMail() + "\n");
        text.append("Ort: " + projectOffer.getLocation() + "\n");
        text.append("Größe: " + projectOffer.getSize() + "\n");
        text.append("Eigentümer: " + projectOffer.getOwner() + "\n");
        text.append("Aufforstung: " + (projectOffer.isAfforestation() ? "ja" : "nein") + "\n");

        final String purpose = projectOffer.getPurpose();
        if (!StringHelper.isEmpty(purpose)) {
            text.append("Nutzung: " + purpose + "\n");
        }

        text.append("Verkauf: " + (projectOffer.isSelling() ? "ja" : "nein") + "\n");

        final boolean leasing = projectOffer.isLeasing();
        text.append("Pachtverträge: " + (leasing ? "ja" : "nein") + "\n");
        if (leasing) {
            text.append("Zeit der Pachtverträge: " + projectOffer.getLease() + "\n");
        }

        final String comment = projectOffer.getComment();
        if (!StringHelper.isEmpty(comment)) {
            text.append("Bemerkungen: " + comment + "\n");
        }

        return text.toString();
    }

}
