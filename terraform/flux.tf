module "flux-bootstrap" {
  source  = "kube-champ/flux-bootstrap/k8s"

  flux_auth_type    = "ssh"
  git_url           = "ssh://git@github.com:Drazerr/volley-practice.git"
  flux_ssh_scan_url = "github.com"
  flux_target_path  = "kubernetes/*"
  git_branch        = "main"
  sync_interval     = 1 
}