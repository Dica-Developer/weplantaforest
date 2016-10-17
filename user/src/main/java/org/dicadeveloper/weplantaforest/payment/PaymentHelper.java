package org.dicadeveloper.weplantaforest.payment;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import lombok.NonNull;

@Component
public class PaymentHelper {

    protected final Log LOG = LogFactory.getLog(PaymentHelper.class.getName());

    @Autowired
    private @NonNull Environment _env;

    public static final String DEFAULT_ENCODING = "UTF8";

    private final static DecimalFormat priceFormat = new DecimalFormat("#0.00");

    public String postRequest(Cart cart, PaymentData paymentData) {
        String address = _env.getProperty("bfs.url");
        try {
            DefaultHttpClient httpClient = new DefaultHttpClient();
            HttpPost httpPost = new HttpPost(address);

            List<NameValuePair> urlParameters = new ArrayList<NameValuePair>();
            Map<String, String> params = createParams(cart, paymentData);
            for (Entry<String, String> entry : params.entrySet()) {
                urlParameters.add(new BasicNameValuePair(entry.getKey(), entry.getValue()));
            }

            httpPost.setEntity(new UrlEncodedFormEntity(urlParameters));

            HttpResponse response = httpClient.execute(httpPost);

            BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
            StringBuffer result = new StringBuffer();
            String line = "";
            while ((line = rd.readLine()) != null) {
                result.append(line);
            }
            return result.toString();
        } catch (final Exception e) {
            LOG.error("unable to do post request to '" + address + "'", e);
        }
        return null;
    }

    public boolean isSuccessFull(String result) {
        return result != null && result.contains("status=success");
    }

    public String getErrorCode(String response) {
        return response.substring(response.indexOf("&amp;code=") + 10, response.indexOf("&amp;code=") + 13);
    }

    private Map<String, String> createParams(Cart cart, PaymentData paymentData) {
        Map<String, String> params = new HashMap<>();

        // mandatory parameters
        params.put("charset", DEFAULT_ENCODING);
        params.put("oid", _env.getProperty("bfs.oid"));

        String formattedPrice = priceFormat.format(cart.getTotalPrice().doubleValue()).toString();
        formattedPrice = formattedPrice.replace(",", ".");
        params.put("betrag", formattedPrice);

        params.put("anrede", paymentData.getSalutation().toString());
        params.put("vorname", paymentData.getForename());
        params.put("nachname", paymentData.getName());
        params.put("strasse", paymentData.getStreet());
        params.put("land", paymentData.getCountry());
        params.put("ort", paymentData.getCity());
        params.put("plz", paymentData.getZip());
        params.put("email", paymentData.getMail());
        params.put("verwendungszweck", "Spende I Plant A Tree");
        params.put("quittung", paymentData.getReceipt());
        params.put("zahlungsart", paymentData.getPaymentMethod());
        params.put("sepa_data[iban]", paymentData.getIban());
        params.put("sepa_data[bic]", paymentData.getBic());

        // optional parameters
        params.put("ret_success_url", Uris.PAYMENT_SUCCESS);
        params.put("ret_error_url", Uris.PAYMENT_ERROR);
        params.put("trackingcode", "Cart-ID: " + cart.getId());

        if (null != paymentData.getCompany() && !paymentData.getCompany().isEmpty()) {
            params.put("firma", paymentData.getCompany());
        }
        if (null != paymentData.getCompanyAddon() && !paymentData.getCompanyAddon().isEmpty()) {
            params.put("firma_zusatz", paymentData.getCompanyAddon());
        }
        if (null != paymentData.getComment() && !paymentData.getComment().isEmpty()) {
            params.put("kommentar", paymentData.getComment());
        }

        return params;
    }

}
