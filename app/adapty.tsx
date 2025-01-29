import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  ActivityIndicator,
  StyleSheet,
  Text,
} from "react-native";
import { adapty, AdaptyPaywall } from "react-native-adapty";
import { createPaywallView } from "@adapty/react-native-ui";
import { router } from "expo-router";

const PaywallScreen = () => {
  const [paywall, setPaywall] = useState<AdaptyPaywall | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Adapty'i başlat
    adapty.activate("public_live_4Hlw9dpe.NMnoQYBjNTLQofLN5fDy");

    // Paywall'ı yükle
    const fetchPaywall = async () => {
      try {
        setLoading(true);
        setError(null);

        const paywallData = await adapty.getPaywall("habitz_placement");
        if (paywallData.hasViewConfiguration) {
          const view = await createPaywallView(paywallData);
          view.present();
          view.registerEventHandlers({
            onCloseButtonPress: () => {
              console.log("Close button pressed");
              view.dismiss();
              router.push("/(tabs)");
            },
            onRestoreStarted: () => {
              console.log("Restore started");
            },
            onRestoreCompleted: () => {
              console.log("Restore completed");
              view.dismiss();
            },
            onPurchaseStarted(product) {
              console.log("Purchase started", product);
            },
            onPurchaseCancelled(product) {
              console.log("Purchase cancelled", product);
            },
            onProductSelected(product) {
              console.log("Product selected", product);
              // Customize view if needed
              handlePurchase(product);
            },
            onPurchaseCompleted: (product) => {
              console.log("Purchase completed", product);
              view.dismiss();
            },
            onPurchaseFailed: (error) => {
              console.log("Purchase failed", error);
            },
            onAction: (action) => {
              console.log("Action", action);
            },
          });
        }
        setPaywall(paywallData);
      } catch (err) {
        setError("Paywall yüklenirken hata oluştu. Lütfen tekrar deneyin.");
        console.error("Paywall yükleme hatası:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPaywall();
  }, [adapty, createPaywallView, router, setPaywall, setLoading, setError]);

  const handlePurchase = async (product: any) => {
    try {
      const result = await adapty.makePurchase(product?.vendorId);
      console.log("Satın alma başarılı:", result);
    } catch (err) {
      console.error("Satın alma hatası:", err);
    }
  };

  // console.log({ paywall });

  // console.log("products", paywall?.products);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
        <Button
          title="Yeniden Dene"
          onPress={() => adapty.getPaywall("habitz_placement")}
        />
      </View>
    );
  }

  if (!paywall) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Paywall bulunamadı.</Text>
        <Button
          title="Yeniden Dene"
          onPress={() => adapty.getPaywall("habitz_placement")}
        />
      </View>
    );
  }

  return <View style={{ flex: 1 }}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default PaywallScreen;
